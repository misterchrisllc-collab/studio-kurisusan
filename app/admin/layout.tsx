import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { getAdminUser } from "@/lib/admin-auth";
import { signOut } from "./actions";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Pinch-zoom stays available everywhere except the drawing canvas, which blocks it locally.
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  return (
    <div className="adm">
      <div className="adm-bar">
        <Link href="/admin" className="adm-brand">
          Studio くりすさん <span>Admin</span>
        </Link>
        {user && (
          <nav className="adm-nav">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/storyboards">Storyboards</Link>
            <form action={signOut}>
              <button type="submit" className="adm-link">Sign out</button>
            </form>
          </nav>
        )}
      </div>
      {children}
    </div>
  );
}
