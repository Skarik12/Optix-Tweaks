export default async function ResetPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <main className="auth-wrap">
      <div className="card">
        <h1>Reset password</h1>
        <form action="/api/reset-password" method="post">
          <input type="hidden" name="token" value={token} />
          <label>New password<input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
          <button type="submit">Update password</button>
        </form>
      </div>
    </main>
  );
}
