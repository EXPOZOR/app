import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { FAQ } from "@/content/landing";
import "@/app/globals.css";

/* ── Base URL ──────────────────────────────────────────────── */
const BASE_URL = "https://expozor.app";

/* ── Metadata ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "EXPOZOR — Your finances, finally intelligent.",
    template: "%s | EXPOZOR",
  },

  description:
    "AI that categorizes, budgets, and splits your money — automatically. Join the waitlist and lock in Founders' pricing for life.",

  keywords: [
    "expense tracker",
    "personal finance app",
    "AI expense manager",
    "receipt scanner",
    "budget app",
    "bank sync",
    "shared expenses",
    "money management",
    "AI categorization",
    "household budget",
    "waitlist",
    "private beta",
  ],

  authors: [{ name: "EXPOZOR", url: BASE_URL }],
  creator: "EXPOZOR",
  publisher: "EXPOZOR, Inc.",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "EXPOZOR",
    title: "EXPOZOR — Your finances, finally intelligent.",
    description:
      "AI that categorizes, budgets, and splits your money — automatically. Join the waitlist.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "EXPOZOR — Your finances, finally intelligent.",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EXPOZOR — Your finances, finally intelligent.",
    description:
      "AI that categorizes, budgets, and splits your money — automatically.",
    images: ["/twitter-image"],
    creator: "@EXPOZOR",
    site: "@EXPOZOR",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/icon?size=192", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
};

/* ── Viewport ──────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0A0A0B" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/* ── JSON-LD ───────────────────────────────────────────────── */
function buildJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "EXPOZOR",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
      width: 120,
      height: 32,
    },
    sameAs: [
      "https://twitter.com/expozor",
      "https://github.com/expozor",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@expozor.app",
      contactType: "customer support",
    },
  };

  const product = {
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#product`,
    name: "EXPOZOR",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "AI-native personal and shared expense manager. Bank sync, AI categorization, budgets, and household splits.",
    url: BASE_URL,
    screenshot: `${BASE_URL}/opengraph-image`,
    offers: [
      { "@type": "Offer", price: "0",  priceCurrency: "USD", name: "Free"   },
      { "@type": "Offer", price: "6",  priceCurrency: "USD", name: "Plus"   },
      { "@type": "Offer", price: "14", priceCurrency: "USD", name: "Pro"    },
      { "@type": "Offer", price: "24", priceCurrency: "USD", name: "Family" },
    ],
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  // Wire FAQ schema to the same content used in the FAQ accordion
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#faq`,
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, product, faqPage],
  };
}

/* ── Root layout ───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/*
          Preload the variable font — Geist Sans is served by the
          `geist` package as a CSS font face; Next.js handles the
          actual file preload automatically when it detects the
          font variable. The explicit preload below is belt-and-suspenders
          for the woff2 subset that ships with the package.
        */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* View Transitions API — enables smooth page-to-page animations */}
        <meta name="view-transition" content="same-origin" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body>
        {/* WCAG 2.4.1 — skip navigation link */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
