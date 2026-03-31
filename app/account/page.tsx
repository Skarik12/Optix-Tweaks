import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  return (
    <main className="auth-wrap">
      <div className="card">
        <h1>Your account</h1>
        <p className="small">Signed in as {session.user.email}</p>
      </div>
    </main>
  );
}
