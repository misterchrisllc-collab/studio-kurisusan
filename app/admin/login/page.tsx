import LoginForm from "@/components/admin/LoginForm";

export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return (
    <main className="adm-login">
      <h1>Sign in</h1>
      <p className="adm-muted">Private area for Studio くりすさん.</p>
      <LoginForm next={searchParams.next ?? ""} />
    </main>
  );
}
