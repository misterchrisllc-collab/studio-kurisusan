import { notFound } from "next/navigation";
import { z } from "zod";
import { getProject } from "@/lib/storyboards/server";
import PrintView from "@/components/admin/storyboards/PrintView";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }) {
  if (!z.string().uuid().safeParse(params.id).success) return { title: "Storyboard" };
  const data = await getProject(params.id);
  // The document title becomes the default PDF file name.
  return { title: { absolute: data ? `${data.project.title} – storyboard` : "Storyboard" } };
}

export default async function PrintPage({ params }: { params: { id: string } }) {
  if (!z.string().uuid().safeParse(params.id).success) notFound();
  const data = await getProject(params.id);
  if (!data) notFound();
  return <PrintView project={data.project} shots={data.shots} />;
}
