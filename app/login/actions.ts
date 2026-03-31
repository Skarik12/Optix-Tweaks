"use server";

import { signIn } from "@/auth";

export async function signInWithCredentials(formData: FormData) {
  await signIn("credentials", {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    redirectTo: "/"
  });
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function signInWithDiscord() {
  await signIn("discord", { redirectTo: "/" });
}
