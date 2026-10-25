import { listProjects } from "@/lib/storyboards/server";
import ProjectList from "@/components/admin/storyboards/ProjectList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Storyboards" };

export default async function StoryboardsPage() {
  const projects = await listProjects();
  return (
    <main className="adm-main">
      <ProjectList initial={projects} />
    </main>
  );
}
