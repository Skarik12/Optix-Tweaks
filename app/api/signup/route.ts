import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
  "cf-turnstile-response": z.string().optional()
});

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const ok = await verifyTurnstile(
    parsed.data["cf-turnstile-response"] ?? null,
    req.headers.get("CF-Connecting-IP")
  );
  if (!ok) {
    return NextResponse.json({ error: "Turnstile validation failed" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Account already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await db.user.create({
    data: {
      email,
      name: parsed.data.name || null,
      passwordHash
    }
  });

  return NextResponse.redirect(new URL("/login", req.url), 303);
}
