import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RR ASSOCIATES | Construction & Interiors",
  description:
    "RR ASSOCIATES — practical construction, responsible execution, professional finishing. 9+ years, 30+ projects across residential, apartments, hospitals and interiors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
