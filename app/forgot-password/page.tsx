import TurnstileWidget from "@/components/TurnstileWidget";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-wrap">
      <div className="card">
        <h1>Forgot password</h1>
        <form action="/api/forgot-password" method="post">
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <TurnstileWidget />
          <button type="submit">Send reset link</button>
        </form>
      </div>
    </main>
  );
}
