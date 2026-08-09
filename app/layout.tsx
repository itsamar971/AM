import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeBoot } from "@/components/ThemeBoot";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "AM",
  description:
    "AM Studio transforms briefs into high-impact digital products, brands, and autonomous systems.",
  applicationName: "AM",
  icons: { icon: "/favicon.svg" },
  authors: [{ name: "AM Studio" }],
  keywords: [
    "agency",
    "branding",
    "design system",
    "software engineering",
    "digital products",
  ],
  openGraph: {
    title: "AM",
    description:
      "Transforming briefs into high-impact digital products, brands, and systems.",
    type: "website",
    siteName: "AM",
  },
  twitter: {
    card: "summary",
    title: "AM",
    description:
      "Transforming briefs into high-impact digital products, brands, and systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1211" },
    { media: "(prefers-color-scheme: light)", color: "#f2efe6" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const tree = (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeBoot />
      </head>
      <body>
        <noscript>
          <style>{`.loader { display: none !important; }`}</style>
        </noscript>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
  return clerkEnabled ? <ClerkProvider afterSignOutUrl="/">{tree}</ClerkProvider> : tree;
}
