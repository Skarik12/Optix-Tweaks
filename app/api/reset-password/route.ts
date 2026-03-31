import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { sha256 } from "@/lib/token";

const schema = z.object({
  token: z.string().min(32).max(256),
  password: z.string().min(8).max(128)
});

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const tokenHash = sha256(parsed.data.token);
  const token = await db.passwordResetToken.findUnique({
    where: { tokenHash }
  });

  if (!token || token.usedAt || token.expiresAt < new Date()) {
    return NextResponse.json({ error: "Reset link is invalid or expired" }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await db.$transaction([
    db.user.update({
      where: { id: token.userId },
      data: { passwordHash }
    }),
    db.passwordResetToken.update({
      where: { id: token.id },
      data: { usedAt: new Date() }
    }),
    db.session.deleteMany({
      where: { userId: token.userId }
    })
  ]);

  return NextResponse.redirect(new URL("/login", req.url), 303);
}
