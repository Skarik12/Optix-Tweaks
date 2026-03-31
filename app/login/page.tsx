import Link from "next/link";
import { signInWithCredentials, signInWithDiscord, signInWithGoogle } from "./actions";
import TurnstileWidget from "@/components/TurnstileWidget";

export default function LoginPage() {
  return (
    <main className="auth-wrap">
      <div className="card">
        <h1>Login</h1>
        <form action={signInWithCredentials}>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required minLength={8} maxLength={128} /></label>
          <TurnstileWidget />
          <button type="submit">Login with email</button>
        </form>

        <div className="row" style={{marginTop:"12px"}}>
          <form action={signInWithGoogle}><button type="submit" className="secondary">Continue with Google</button></form>
          <form action={signInWithDiscord}><button type="submit" className="secondary">Continue with Discord</button></form>
        </div>

        <p className="small"><Link href="/forgot-password">Forgot password?</Link></p>
        <p className="small"><Link href="/signup">Need an account? Sign up</Link></p>
      </div>
    </main>
  );
}
