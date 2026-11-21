import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPOS Effects — مكتبة تأثيرات CSS مفتوحة المصدر",
  description:
    "SPOS Effects: an open-source library of 30 hand-crafted pure-CSS effects — buttons, loaders, text, cards, backgrounds and inputs — with live demos and one-click copy. مكتبة تأثيرات CSS متكاملة من صولة للأنظمة.",
  keywords: [
    "SPOS Effects",
    "SPOS",
    "صولة للأنظمة",
    "CSS effects",
    "CSS library",
    "تأثيرات CSS",
    "CSS animations",
    "hover effects",
    "loaders",
    "open source",
  ],
  authors: [{ name: "SPOS Systems (صولة للأنظمة)", url: "https://spos.ly" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SPOS Effects — Open-source CSS Effects Library",
    description:
      "30 hand-crafted pure-CSS effects with live demos and one-click copy. Zero JavaScript. من صولة للأنظمة.",
    url: "https://spos.ly",
    siteName: "SPOS Effects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPOS Effects — Open-source CSS Effects Library",
    description:
      "30 hand-crafted pure-CSS effects with live demos and one-click copy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
