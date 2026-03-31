import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OptiX",
  description: "OptiX secure site starter with auth and commerce-ready structure."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
