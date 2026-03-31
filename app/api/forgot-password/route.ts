import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { generateToken, sha256 } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  email: z.string().email().max(254),
  "cf-turnstile-response": z.string().optional()
});

const GENERIC_MESSAGE = "If an account exists for that email, a reset link has been sent.";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return NextResponse.json({ message: GENERIC_MESSAGE }, { status: 200 });
  }

  const ok = await verifyTurnstile(
    parsed.data["cf-turnstile-response"] ?? null,
    req.headers.get("CF-Connecting-IP")
  );
  if (!ok) {
    return NextResponse.json({ message: GENERIC_MESSAGE }, { status: 200 });
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (!user) {
    return NextResponse.json({ message: GENERIC_MESSAGE }, { status: 200 });
  }

  const rawToken = generateToken();
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  });

  const resetUrl = new URL("/reset-password", req.url);
  resetUrl.searchParams.set("token", rawToken);

  await sendPasswordResetEmail(user.email, resetUrl.toString());
  return NextResponse.json({ message: GENERIC_MESSAGE }, { status: 200 });
}
