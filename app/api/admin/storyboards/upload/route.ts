import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { BUCKET, db, removeObjects, signPaths, touchProject } from "@/lib/storyboards/server";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/**
 * Upload a reference image for one shot. Replaces only that shot's previous
 * reference image; sketches, drawings and other shots are untouched.
 * The client downsizes to ~2400px JPEG first, so files stay well under Vercel's body limit.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const form = await req.formData();
  const shotId = z.string().uuid().safeParse(form.get("shotId"));
  const file = form.get("file");
  if (!shotId.success || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing shot or file" }, { status: 400 });
  }
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Use a JPEG, PNG or WebP image" }, { status: 415 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image is larger than 10MB" }, { status: 413 });
  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesType(bytes, file.type)) return NextResponse.json({ error: "That file isn't a real JPEG, PNG or WebP image" }, { status: 415 });

  const supabase = db();
  const { data: shot, error } = await supabase
    .from("storyboard_shots")
    .select("id, project_id, reference_path")
    .eq("id", shotId.data)
    .maybeSingle();
  if (error || !shot) return NextResponse.json({ error: "Shot not found" }, { status: 404 });

  const path = `${shot.project_id}/${shot.id}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const { error: updErr } = await supabase
    .from("storyboard_shots")
    .update({ reference_path: path, background: "reference", updated_at: new Date().toISOString() })
    .eq("id", shot.id);
  if (updErr) {
    await removeObjects(shot.project_id, [path]);
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }
  // Only after the row points at the new file is the old one removed.
  await removeObjects(shot.project_id, [shot.reference_path]);
  await touchProject(shot.project_id);

  const urls = await signPaths([path]);
  return NextResponse.json({ path, url: urls.get(path) ?? null });
}

/** The declared type comes from the browser; check the file's own signature too. */
function matchesType(b: Buffer, type: string): boolean {
  if (type === "image/jpeg") return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (type === "image/png") return b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (type === "image/webp") return b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}
