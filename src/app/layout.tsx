import type { Metadata, Viewport } from "next";
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

/** Public URL of the deployed site (the GitHub Pages build by default). */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://spos-systems.github.io/SPOS-Effects"
).replace(/\/+$/, "");

const SITE_NAME = "SPOS Effects";
const VERSION = "1.0.1";
const CDN_URL = `https://cdn.jsdelivr.net/gh/spos-systems/SPOS-Effects@v${VERSION}/spos-effects.css`;
const TITLE =
  "SPOS Effects — مكتبة تأثيرات CSS مفتوحة المصدر | Open-Source CSS Effects Library";
const DESCRIPTION =
  "مكتبة تأثيرات CSS مفتوحة المصدر من صولة للأنظمة — 30 تأثيراً جاهزاً للأزرار والنصوص ومؤشرات التحميل والبطاقات والخلفيات وحقول الإدخال، مع معاينة حية ونسخ بنقرة واحدة. An open-source library of 30 hand-crafted, pure-CSS effects with live demos and one-click copy — zero JavaScript, by SPOS Systems (spos.ly).";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [
    "SPOS Effects",
    "SPOS",
    "SPOS Systems",
    "صولة للأنظمة",
    "spos.ly",
    "CSS effects",
    "CSS effects library",
    "pure CSS",
    "CSS animations",
    "hover effects",
    "CSS buttons",
    "CSS loaders",
    "open source CSS",
    "تأثيرات CSS",
    "مكتبة تأثيرات CSS",
    "تأثيرات CSS جاهزة",
    "شركة برمجيات ليبيا",
    "تصميم مواقع ليبيا",
  ],
  authors: [{ name: "SPOS Systems (صولة للأنظمة)", url: "https://spos.ly" }],
  creator: "SPOS Systems (صولة للأنظمة)",
  publisher: "SPOS Systems (صولة للأنظمة)",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["ar_LY"],
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SPOS Effects — 30 pure-CSS effects with live demos and one-click copy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "LY",
    "geo.placename": "Tripoli, Libya",
    ICBM: "32.8872, 13.1913",
  },
};

/**
 * Structured data (JSON-LD) for search engines:
 * - Organization: SPOS Systems (صولة للأنظمة) — the business behind the library
 * - WebSite: this demo site
 * - SoftwareApplication: the SPOS Effects library itself
 */
const jsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://spos.ly/#organization",
      name: "صولة للأنظمة",
      alternateName: ["SPOS Systems", "SPOS"],
      url: "https://spos.ly",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
      slogan: "حلول برمجية متكاملة — من الفكرة إلى الإطلاق",
      description:
        "شركة ليبية متخصصة في الحلول البرمجية المتكاملة — تصميم وتطوير المواقع والمتاجر الإلكترونية والأنظمة الإدارية والتطبيقات المخصصة، من الفكرة إلى الإطلاق.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+218-93-553-5606",
        url: "https://wa.me/218935535606",
        availableLanguage: ["ar", "en"],
        areaServed: "LY",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "LY",
        addressLocality: "طرابلس",
      },
      areaServed: [
        { "@type": "Country", name: "Libya" },
        { "@type": "City", name: "Tripoli" },
      ],
      sameAs: ["https://github.com/spos-systems", `${SITE_URL}/`],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description:
        "Open-source CSS effects library — 30 hand-crafted pure-CSS effects with live demos and one-click copy. مكتبة تأثيرات CSS مفتوحة المصدر من صولة للأنظمة.",
      inLanguage: ["en", "ar"],
      publisher: { "@id": "https://spos.ly/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "CSS Effects Library",
      operatingSystem: "Any",
      programmingLanguage: "CSS",
      softwareVersion: VERSION,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": "https://spos.ly/#organization" },
      screenshot: `${SITE_URL}/og-image.png`,
      description:
        "30 hand-crafted, 100% dependency-free, pure-CSS effects — buttons, text, loaders, cards, backgrounds and inputs — with live demos and one-click copy.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is SPOS Effects? · ما هي مكتبة SPOS Effects؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: `SPOS Effects is an open-source library of 30 hand-crafted, 100% pure-CSS effects — buttons, text animations, loaders, cards, backgrounds, and inputs — with live demos and one-click copy. Every class is prefixed with fx- and the whole library ships as a single stylesheet (${CDN_URL}). مكتبة مفتوحة المصدر تضم 30 تأثير CSS جاهزاً مع معاينة حية ونسخ بنقرة واحدة، من صولة للأنظمة.`,
          },
        },
        {
          "@type": "Question",
          name: "How do I use the effects in my project? · كيف أستخدم التأثيرات في مشروعي؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Add one stylesheet to your page — <link rel="stylesheet" href="${CDN_URL}"> — or download spos-effects.css from the site, then add an fx- class to any element, e.g. <button class="fx-btn-neon-glow">. Works with any framework or plain HTML. أضف ملف واحد فقط ثم استخدم صنف fx- على أي عنصر — يعمل مع أي إطار عمل أو HTML خالص.`,
          },
        },
        {
          "@type": "Question",
          name: "Does it require JavaScript? · هل يحتاج إلى JavaScript؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The effects themselves are 100% pure CSS with zero JavaScript and zero dependencies. The companion demo site is a Next.js app, but what you copy into your project is pure CSS. التأثيرات نفسها CSS خالص تماماً بدون أي JavaScript — موقع العرض فقط مبني بـ Next.js.",
          },
        },
        {
          "@type": "Question",
          name: "Is it free? · هل هي مجانية؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. SPOS Effects is released under the MIT License — free for personal and commercial projects, no attribution required. مجانية بالكامل بموجب رخصة MIT للاستخدام الشخصي والتجاري.",
          },
        },
        {
          "@type": "Question",
          name: "Who is behind SPOS Effects? · من طوّر المكتبة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SPOS Effects is crafted by SPOS Systems (صولة للأنظمة), a Libyan software company building complete solutions from idea to launch — websites, e-commerce, administrative systems, and custom apps. Contact: https://spos.ly · WhatsApp: https://wa.me/218935535606 · Phone: +218 93 553 5606. طوّرتها صولة للأنظمة، شركة ليبية للحلول البرمجية المتكاملة من الفكرة إلى الإطلاق.",
          },
        },
      ],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
