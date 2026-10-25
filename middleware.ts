import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Guards /admin and /api/admin. Refreshes the Supabase session cookie and
 * bounces anyone who is not an allowlisted admin. Server actions and route
 * handlers check again with requireAdmin(); this is the first gate, not the only one.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return isLogin ? response : deny(request);

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  // Same parsing as parseAdminEmails in lib/admin-auth.ts (that file is server-only, so not imported here).
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .replace(/^\s*ADMIN_EMAILS\s*=/i, "")
    .split(/[,;\s]+/)
    .map((e) => e.replace(/^["']+|["']+$/g, "").trim().toLowerCase())
    .filter((e) => e.includes("@"));
  const ok = !!data.user?.email && allow.includes(data.user.email.toLowerCase());

  if (isLogin) {
    if (ok) return NextResponse.redirect(new URL("/admin", request.url));
    return response;
  }
  if (!ok) return deny(request);

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

function deny(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
