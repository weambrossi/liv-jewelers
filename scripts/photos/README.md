# Product photo retouching

Turns a phone/studio shot of a piece on a display stand into a clean 1200 × 1500 still life on white:
the stand is removed, the piece is brightened, and a soft shadow is added down-right.

Originals live in `photos/raw/`. Output goes to `public/images/pieces/`.

```bash
# 1. Find the display stand in each photo (macOS Vision, built in)
swiftc -O scripts/photos/masks.swift -o /tmp/liv-masktool
mkdir -p /tmp/liv-masks /tmp/liv-out
for n in 1 2 3 4 5 6 7 8; do /tmp/liv-masktool photos/raw/$n.jpg /tmp/liv-masks/$n; done

# 2. Cut out, retouch, compose (needs Pillow + numpy)
python3 scripts/photos/process.py photos/raw /tmp/liv-masks /tmp/liv-out "#FFFFFF"
```

Then convert `/tmp/liv-out/<n>.jpg` to WebP under the piece's slug in `public/images/pieces/`.

Per-photo settings are in `JOBS` at the top of `process.py`:

- `stand`: `"dark"` for black velvet, `"light"` for white foam pads (always a pair of studs)
- `metal`: `"silver"` or `"gold"` (sets the color grade)
- `fit`: how much of the frame the piece fills
- `gamma`, `key`, `join`, `unmix`: chain-specific overrides (thin, overexposed chains need a deeper tone)

The last argument is the background color. Use `"#F4F1EC"` to match the site's bone background instead of white.

For best results on new shoots: one piece per photo, plain stand, no price tags, and the piece in focus.
