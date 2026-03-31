import crypto from "crypto";

export const generateToken = () => crypto.randomBytes(32).toString("hex");
export const sha256 = (input: string) =>
  crypto.createHash("sha256").update(input).digest("hex");
