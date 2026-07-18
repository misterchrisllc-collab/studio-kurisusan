// Scans public/photos/portfolio and records each photo's natural size plus any
// dedicated per-ratio crops ({base}_{ratio}.jpg). Re-run after adding crops.
//   node scripts/build-crop-manifest.mjs
import { createRequire } from "module";
import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const require = createRequire("/Users/morethanplesent/yolo/kansai-snaps/package.json");
const sharp = require("sharp");

const DIR = "public/photos/portfolio";
const OUT = "lib/crops.generated.json";
const RATIOS = ["banner", "wide", "landscape", "square", "portrait", "tall"];

const files = readdirSync(DIR).filter((f) => /\.jpg$/i.test(f));
const manifest = {};

for (const file of files) {
  const stem = file.replace(/\.jpg$/i, "");
  const m = stem.match(new RegExp(`^(.+)_(${RATIOS.join("|")})$`));
  const { width, height } = await sharp(join(DIR, file)).metadata();

  if (m) {
    const [, base, ratio] = m;
    manifest[base] ??= { natural: null, crops: [] };
    if (!manifest[base].crops.includes(ratio)) manifest[base].crops.push(ratio);
  } else {
    manifest[stem] ??= { natural: null, crops: [] };
    manifest[stem].natural = { w: width, h: height };
  }
}

for (const [base, entry] of Object.entries(manifest)) {
  entry.crops.sort();
  if (!entry.natural) console.warn(`warn: ${base} has crops but no original`);
}

const sorted = Object.fromEntries(Object.entries(manifest).sort());
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n");
console.log(`${OUT}: ${Object.keys(sorted).length} photos, ${Object.values(sorted).reduce((n, e) => n + e.crops.length, 0)} dedicated crops`);
