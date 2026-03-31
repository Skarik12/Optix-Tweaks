export async function verifyTurnstile(token: string | null, remoteIp?: string | null) {
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const body = new URLSearchParams();
  body.set("secret", process.env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body
  });

  if (!res.ok) return false;
  const data = await res.json();
  return Boolean(data.success);
}
