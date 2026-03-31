import TurnstileWidget from "@/components/TurnstileWidget";

export default function SignupPage() {
  return (
    <main className="auth-wrap">
      <div className="card">
        <h1>Create account</h1>
        <form action="/api/signup" method="post">
          <label>Name<input name="name" type="text" autoComplete="name" maxLength={120} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label>Password<input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
          <TurnstileWidget />
          <button type="submit">Create account</button>
        </form>
      </div>
    </main>
  );
}
