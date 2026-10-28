import type { Metadata } from "next";
import { PiecesGrid } from "@/components/PiecesGrid";
import { CATEGORIES, type Category } from "@/lib/products";

export const metadata: Metadata = { title: "Pieces" };

export default async function PiecesPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const initial = CATEGORIES.some((cat) => cat.id === c) ? (c as Category) : "all";

  return (
    <div className="wrap" style={{ paddingTop: 56 }}>
      <PiecesGrid key={initial} initial={initial} />
    </div>
  );
}
