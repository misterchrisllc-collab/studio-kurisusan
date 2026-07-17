/**
 * Re-export high-resolution web masters for public/photos/portfolio/*.jpg (and heroes)
 * from the gitignored high-res originals in ./photos/.
 *
 * WHY: the committed web copies were derived from ~4-6K originals but the original
 * export script + originals->web mapping were lost. scripts/photo-map.json is the
 * RECOVERED mapping (web copy -> original path, relative to repo root). It was rebuilt
 * with an automated 16x16 grayscale visual matcher and verified by eye (2026-07).
 *
 * Masters are exported at LONG=2560px and served via next/image (AVIF/WebP, right-sized).
 * Bump LONG if you ever need more resolution. Preserves each web copy's current aspect
 * (center crop) so layouts stay intact.
 *
 * RUN (deps live in ../kansai-snaps, this project has no sharp of its own):
 *   node scripts/reexport-masters.mjs
 *
 * If a NEW curated image is added whose original isn't in photo-map.json, add the pair
 * to scripts/photo-map.json (web-copy-filename -> "photos/<folder>/<ORIGINAL>.jpg").
 */
import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/Users/morethanplesent/yolo/kansai-snaps/package.json");
const sharp = require("sharp"); // borrowed from the sibling kansai-snaps project

const ROOT = path.resolve(import.meta.dirname, "..");
const WEB = path.join(ROOT, "public/photos/portfolio");
const PUB = path.join(ROOT, "public/photos");
const LONG = 2560;
const QUALITY = 86;

const map = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/photo-map.json"), "utf8"));

async function reexport(webRel, origRel) {
  // webRel: "tonkatsu-plate.jpg" (portfolio) OR "../hero-cafe.jpg" (public/photos)
  const outPath = webRel.startsWith("../")
    ? path.join(PUB, webRel.slice(3))
    : path.join(WEB, webRel);
  const origPath = path.join(ROOT, origRel);
  if (!fs.existsSync(origPath)) {
    console.warn(`  SKIP (missing original): ${origRel}`);
    return;
  }
  const cur = await sharp(outPath).metadata(); // preserve current aspect ratio
  const aw = cur.width, ah = cur.height;
  let tw, th;
  if (aw >= ah) { tw = LONG; th = Math.round(LONG * ah / aw); }
  else { th = LONG; tw = Math.round(LONG * aw / ah); }
  const pos = webRel.includes("kansai-snaps-portrait") ? "top" : "centre";
  const tmp = outPath + ".tmp.jpg";
  await sharp(origPath).rotate().resize(tw, th, { fit: "cover", position: pos }).jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);
  fs.renameSync(tmp, outPath);
  return `${tw}x${th}`;
}

let n = 0;
for (const [web, orig] of Object.entries(map)) {
  if (!orig) continue;
  const dim = await reexport(web, orig);
  if (dim) n++;
  if (n % 12 === 0) console.log(`  ...${n} done`);
}
console.log(`\nDone: re-exported ${n} masters at ${LONG}px (quality ${QUALITY}).`);
