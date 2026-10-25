import { notFound } from "next/navigation";
import { z } from "zod";
import { aiStatus } from "@/lib/storyboards/ai";
import { getProject } from "@/lib/storyboards/server";
import StoryboardEditor from "@/components/admin/storyboards/StoryboardEditor";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }) {
  if (!z.string().uuid().safeParse(params.id).success) return { title: "Storyboard" };
  const data = await getProject(params.id);
  return { title: data ? `${data.project.title} · Storyboard` : "Storyboard" };
}

export default async function StoryboardPage({ params }: { params: { id: string } }) {
  if (!z.string().uuid().safeParse(params.id).success) notFound();
  const data = await getProject(params.id);
  if (!data) notFound();
  return <StoryboardEditor project={data.project} shots={data.shots} ai={aiStatus()} />;
}
