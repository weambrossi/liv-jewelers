"""Cut each piece off its display stand, brighten it, and place it on a clean 4:5 background.

usage: python3 -I process.py <images_dir> <masks_dir> <out_dir> [bg_hex]
"""
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

IMG, MASKS, OUT = sys.argv[1:4]
BG = sys.argv[4] if len(sys.argv) > 4 else "#FFFFFF"
BG_RGB = np.array([int(BG[i : i + 2], 16) for i in (1, 3, 5)], dtype=np.float32) / 255

W_OUT, H_OUT = 1200, 1500

# stand: "dark" velvet/plastic or "light" foam. fill: how much of the frame the piece occupies.
JOBS = {
    1: dict(stand="dark", metal="silver", fit=("h", 0.82), join=5, gamma=2.6, key=(0.3, 0.5), unmix=False),
    2: dict(stand="dark", metal="silver", fit=("w", 0.86), join=7, gamma=1.5),
    3: dict(stand="dark", metal="silver", fit=("w", 0.46)),
    4: dict(stand="light", metal="silver", fit=("w", 0.56)),
    5: dict(stand="dark", metal="silver", fit=("w", 0.56)),
    6: dict(stand="light", metal="silver", fit=("w", 0.56)),
    7: dict(stand="light", metal="gold", fit=("w", 0.58)),
    8: dict(stand="light", metal="gold", fit=("w", 0.46)),
}


def smoothstep(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def to_pil_l(a):
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8), "L")


def from_pil_l(im):
    return np.asarray(im, dtype=np.float32) / 255


def morph(a, size, op):
    f = ImageFilter.MaxFilter(size) if op == "dilate" else ImageFilter.MinFilter(size)
    return from_pil_l(to_pil_l(a).filter(f))


def components(binary, min_frac):
    """Keep connected regions whose area is at least min_frac of the largest one."""
    h, w = binary.shape
    labels = np.zeros((h, w), dtype=np.int32)
    sizes = [0]
    cur = 0
    ys, xs = np.nonzero(binary)
    for y0, x0 in zip(ys, xs):
        if labels[y0, x0]:
            continue
        cur += 1
        q = deque([(y0, x0)])
        labels[y0, x0] = cur
        n = 0
        while q:
            y, x = q.popleft()
            n += 1
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
                yy, xx = y + dy, x + dx
                if 0 <= yy < h and 0 <= xx < w and binary[yy, xx] and not labels[yy, xx]:
                    labels[yy, xx] = cur
                    q.append((yy, xx))
        sizes.append(n)
    if cur == 0:
        return binary
    sizes = np.array(sizes)
    keep = sizes >= max(sizes.max() * min_frac, 1)
    keep[0] = False
    return keep, labels


def masked_blur(rgb, weight, radius):
    """Blur that ignores pixels where weight is 0 (normalized convolution)."""
    out = np.empty_like(rgb)
    wi = to_pil_l(weight).filter(ImageFilter.GaussianBlur(radius))
    wb = from_pil_l(wi) + 1e-4
    for c in range(3):
        ch = Image.fromarray((rgb[..., c] * weight * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(radius))
        out[..., c] = from_pil_l(ch) / wb
    return np.clip(out, 0, 1)


def solid(core):
    """Close small gaps, fill enclosed holes, and feather the outer edge by ~1.5px."""
    from PIL import ImageDraw
    core = morph(morph(core.astype(np.float32), 7, "dilate"), 7, "erode") > 0.5
    ys, xs = np.nonzero(core)
    if len(ys) == 0:
        return core.astype(np.float32)
    y0, y1, x0, x1 = max(ys.min() - 4, 0), ys.max() + 5, max(xs.min() - 4, 0), xs.max() + 5
    sub = Image.fromarray(core[y0:y1, x0:x1].astype(np.uint8) * 255, "L").copy()  # fromarray images are read-only; floodfill needs a writable copy
    ImageDraw.floodfill(sub, (0, 0), 128)  # everything reachable from outside
    filled = np.asarray(sub) != 128
    out = np.zeros(core.shape, np.float32)
    out[y0:y1, x0:x1] = filled
    return from_pil_l(to_pil_l(out).filter(ImageFilter.GaussianBlur(1.5)))


def local_std(lum, radius=4):
    m = from_pil_l(to_pil_l(lum).filter(ImageFilter.BoxBlur(radius)))
    m2 = from_pil_l(to_pil_l(lum * lum).filter(ImageFilter.BoxBlur(radius)))
    return np.sqrt(np.maximum(m2 - m * m, 0))


def hull_fill(mask):
    """Fill the convex hull of a binary mask (earrings are convex enough)."""
    from PIL import ImageDraw
    ys, xs = np.nonzero(mask)
    if len(xs) < 3:
        return mask.astype(np.float32)
    pts = sorted(set(zip(xs.tolist(), ys.tolist())))
    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    hull = lower[:-1] + upper[:-1]
    im = Image.new("L", (mask.shape[1], mask.shape[0]), 0)
    ImageDraw.Draw(im).polygon(hull, fill=255)
    return from_pil_l(im)


def matte(rgb, stand, kind, job):
    lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    mx, mn = rgb.max(-1), rgb.min(-1)
    sat = (mx - mn) / (mx + 1e-4)
    # orange price tags: strongly saturated, red > blue
    tag = (sat > 0.45) & (rgb[..., 0] > rgb[..., 2] + 0.25) & (rgb[..., 0] > 0.45)
    tag = morph(tag.astype(np.float32), 15, "dilate") > 0.5

    region = morph(stand, 25 if kind == "dark" else 15, "erode") > 0.5

    if kind == "dark":
        dark = region & (lum < 0.25)
        bg = np.median(rgb[dark], axis=0) if dark.any() else np.zeros(3, np.float32)
        bg_img = np.broadcast_to(bg, rgb.shape)
        diff = lum - float(bg @ np.array([0.299, 0.587, 0.114]))
        a = smoothstep(diff, *job.get("key", (0.09, 0.22)))
    else:
        # light foam: estimate the clean background locally, ignoring the jewelry
        rough = np.abs(rgb - masked_blur(rgb, np.ones_like(lum), 40)).max(-1)
        weight = (rough < 0.06).astype(np.float32)
        bg_img = masked_blur(rgb, weight, 25)
        bg_img = masked_blur(rgb, (np.abs(rgb - bg_img).max(-1) < 0.05).astype(np.float32), 18)
        diff = np.abs(rgb - bg_img).max(-1)
        a = smoothstep(diff, 0.07, 0.22)

    a = a * region * (~tag)

    # Clean up: drop thin lines (foam slit, velvet edges) and lint specks.
    core = a > 0.5
    if kind == "light":
        core = morph(morph(core.astype(np.float32), 5, "erode"), 5, "dilate") > 0.5
    scale = 4
    small = np.asarray(
        Image.fromarray(core.astype(np.uint8) * 255).resize((core.shape[1] // scale, core.shape[0] // scale), Image.BOX)
    ) > 40
    small = morph(small.astype(np.float32), job.get("join", 3), "dilate") > 0.5  # join chain links
    keep_ids, labels = components(small, 0.04 if kind == "light" else 0.03)
    stand_small = np.asarray(Image.fromarray((stand * 255).astype(np.uint8)).resize(small.shape[::-1], Image.BOX)) > 127
    pad_cols = np.nonzero(stand_small.any(0))[0]
    pad_x0, pad_x1 = pad_cols.min(), pad_cols.max()
    # Jewelry has sparkle (very bright pixels) or gold color; stand shadows and slit notches don't.
    sm_rgb = np.asarray(Image.fromarray((rgb * 255).astype(np.uint8)).resize(small.shape[::-1], Image.BOX), np.float32) / 255
    sm_lum = sm_rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    sm_sat = (sm_rgb.max(-1) - sm_rgb.min(-1)) / (sm_rgb.max(-1) + 1e-4)
    sm_tex = local_std(sm_lum, 2)
    for i in np.nonzero(keep_ids)[0]:
        sel = labels == i
        contrast = float(np.std(sm_lum[sel]))
        texture = float(np.median(sm_tex[sel]))
        gold = float(np.percentile(sm_sat[sel], 90))
        if kind == "light":
            # Pad shadows are smooth; slit notches sit at the far left/right ends of the pad.
            ys, xs = np.nonzero(sel)
            cx = xs.mean()
            near_end = cx < pad_x0 + 0.13 * (pad_x1 - pad_x0) or cx > pad_x1 - 0.13 * (pad_x1 - pad_x0)
            if contrast < 0.03 or near_end:
                keep_ids[i] = False
        elif texture < 0.035:
            keep_ids[i] = False
    keep = keep_ids[labels]
    kept_labels = [i for i in np.nonzero(keep_ids)[0]]
    keep = np.asarray(Image.fromarray(keep.astype(np.uint8) * 255).resize((core.shape[1], core.shape[0]), Image.NEAREST)) > 0
    keep = morph(keep.astype(np.float32), 13, "dilate") > 0.5
    a = a * keep
    if kind == "light":
        # Every pad holds a pair of studs: outline the left and right halves separately.
        core = a > 0.35
        tex = local_std(lum, 3)
        kept = np.zeros(core.shape, bool)
        for i in kept_labels:
            m = np.asarray(Image.fromarray((labels == i).astype(np.uint8) * 255).resize(core.shape[::-1], Image.NEAREST)) > 0
            kept |= m
        kept = morph(kept.astype(np.float32), 13, "dilate") > 0.5
        textured = core & kept & (tex > 0.02)
        mid = int((pad_x0 + pad_x1) / 2 * scale)
        acc = np.zeros(a.shape, np.float32)
        for half in (slice(0, mid), slice(mid, None)):
            part = np.zeros_like(textured)
            part[:, half] = textured[:, half]
            if part.sum() >= 50:
                acc = np.maximum(acc, hull_fill(part))
        a = from_pil_l(to_pil_l(acc).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.5)))
    else:
        # Trim the outermost pixel so no dark velvet fringe remains.
        choke = from_pil_l(to_pil_l((a > 0.5).astype(np.float32)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1)))
        a = np.minimum(a, choke + 0.0)
    return np.clip(a, 0, 1), bg_img


def grade(fg, metal, gamma=1.2):
    fg = np.asarray(fg, np.float32)
    lum = fg @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    if metal == "silver":
        fg = lum[..., None] * 0.6 + fg * 0.4  # neutral, no green/blue cast
        fg = fg * np.array([1.0, 1.0, 1.02], dtype=np.float32)
    else:
        mean = lum[..., None]
        fg = mean + (fg - mean) * 1.25  # richer gold
        fg = fg * np.array([1.04, 1.0, 0.92], dtype=np.float32)
    fg = np.clip(fg * 1.12, 0, 1)  # exposure
    if metal == "silver":
        fg = fg ** gamma
    # contrast around the midtones: keeps dark reflections that define the metal
    fg = 0.5 + (fg - 0.5) * 1.22
    return np.clip(fg, 0, 1)


def place(rgb_out, alpha, fit):
    ys, xs = np.nonzero(alpha > 0.05)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    pad = 6
    y0, x0 = max(y0 - pad, 0), max(x0 - pad, 0)
    y1, x1 = min(y1 + pad, alpha.shape[0] - 1), min(x1 + pad, alpha.shape[1] - 1)
    crop_rgb = rgb_out[y0:y1, x0:x1]
    crop_a = alpha[y0:y1, x0:x1]
    h, w = crop_a.shape
    axis, frac = fit
    s = (W_OUT * frac / w) if axis == "w" else (H_OUT * frac / h)
    s = min(s, W_OUT * 0.9 / w, H_OUT * 0.86 / h)
    nw, nh = max(int(w * s), 1), max(int(h * s), 1)
    fg = Image.fromarray((crop_rgb * 255).astype(np.uint8)).resize((nw, nh), Image.LANCZOS)
    am = Image.fromarray((crop_a * 255).astype(np.uint8), "L").resize((nw, nh), Image.LANCZOS)

    canvas = np.ones((H_OUT, W_OUT, 3), np.float32) * BG_RGB
    cx, cy = W_OUT // 2, int(H_OUT * 0.47)
    left, top = cx - nw // 2, cy - nh // 2

    # soft shadow, down and to the right
    sh = Image.new("L", (W_OUT, H_OUT), 0)
    sh.paste(am, (left + int(nw * 0.012) + 6, top + int(nh * 0.02) + 10))
    sh = from_pil_l(sh.filter(ImageFilter.GaussianBlur(max(nw, nh) * 0.012 + 6)))
    canvas *= 1 - 0.13 * sh[..., None]

    full_a = np.zeros((H_OUT, W_OUT), np.float32)
    full_fg = np.zeros((H_OUT, W_OUT, 3), np.float32)
    full_a[top : top + nh, left : left + nw] = from_pil_l(am)
    full_fg[top : top + nh, left : left + nw] = np.asarray(fg, np.float32) / 255
    out = full_fg * full_a[..., None] + canvas * (1 - full_a[..., None])
    img = Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))
    return img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))


for n, job in JOBS.items():
    rgb = np.asarray(Image.open(f"{IMG}/{n}.jpg").convert("RGB"), np.float32) / 255
    stand = from_pil_l(Image.open(f"{MASKS}/{n}-i1.png").convert("L").resize((rgb.shape[1], rgb.shape[0])))
    a, bg_img = matte(rgb, stand, job["stand"], job)
    # un-mix the stand color from soft edges so no dark/grey fringe remains
    if job["stand"] == "dark" and job.get("unmix", True):
        a_safe = np.maximum(a, 0.35)[..., None]
        fg = np.clip((rgb - (1 - a_safe) * bg_img) / a_safe, 0, 1)
    elif job["stand"] == "dark":
        fg = rgb
    else:
        # brighten by how far the pad is from white (gently), not per pixel
        pad = float(np.median((bg_img @ np.array([0.299, 0.587, 0.114], dtype=np.float32))[a > 0.5])) if (a > 0.5).any() else 0.9
        fg = np.clip(rgb * (0.95 / max(pad, 0.3)) ** 0.6, 0, 1)
    fg = grade(fg, job["metal"], job.get("gamma", 1.2))
    img = place(fg, a, job["fit"])
    img.save(f"{OUT}/{n}.jpg", quality=92)
    to_pil_l(a).save(f"{OUT}/{n}-alpha.png")
    print("done", n)
