import Image from "next/image";
import manifest from "@/lib/crops.generated.json";

/* The layout's ratio vocabulary. A slot declares the shape it wants; the photo
   is prepared to fit it later. Until a dedicated crop exists we render the
   original at its natural aspect rather than cropping to force the shape. */
export const RATIO = {
  wide: 16 / 9,
  landscape: 3 / 2,
  square: 1,
  portrait: 4 / 5,
  tall: 2 / 3,
} as const;

export type Ratio = keyof typeof RATIO;

type Entry = { natural: { w: number; h: number } | null; crops: string[] };
const PHOTOS = manifest as Record<string, Entry>;

/* Drop `{base}_{ratio}.jpg` into public/photos/portfolio, re-run
   scripts/build-crop-manifest.mjs, and this starts serving it. No code change. */
export function resolvePhoto(base: string, ratio: Ratio) {
  const entry = PHOTOS[base];
  const cropped = entry?.crops.includes(ratio) ?? false;
  const natural = entry?.natural;

  return {
    src: cropped
      ? `/photos/portfolio/${base}_${ratio}.jpg`
      : `/photos/portfolio/${base}.jpg`,
    // A dedicated crop is already the declared shape, so honouring the slot
    // costs nothing. An original keeps its own aspect and the row goes ragged.
    aspect: cropped
      ? RATIO[ratio]
      : natural
        ? natural.w / natural.h
        : RATIO[ratio],
    cropped,
  };
}

export default function PortfolioImage({
  base,
  ratio,
  alt,
  sizes,
  priority = false,
}: {
  base: string;
  ratio: Ratio;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const { src, aspect } = resolvePhoto(base, ratio);

  return (
    <div className="pf-frame" style={{ aspectRatio: String(aspect) }}>
      <Image src={src} alt={alt} fill sizes={sizes} quality={82} priority={priority} />
    </div>
  );
}
