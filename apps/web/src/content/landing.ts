/**
 * /content/landing.ts
 * Single source of truth for landing-page copy.
 */

export const HERO = {
  badge: "Expense Tracking, Simplified",
  headline: "Know where your money is really going.",
  displayWord: "really",
  subhead:
    "Track expenses, spot hidden fees, and understand your spending - no bank connection required.",
  cta: "Join early access",
  ctaAriaLabel: "Join early access with EXPOZOR",
  secondaryCta: "See how it works",
  secondaryCtaAriaLabel: "See how it works in the EXPOZOR demo",
  microcopy: "No bank login required. No credit card needed to get started.",
  inputPlaceholder: "you@example.com",
} as const;

export const NAVBAR = {
  logo: "EXPOZOR",
  links: [
    { label: "Features", href: "/features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Demo", href: "/demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Changelog", href: "/changelog" },
  ],
  cta: { label: "Join early access", href: "/#waitlist" },
} as const;

export const DEMO = {
  badge: "Interactive product preview",
  title: "See it in action",
  description:
    "Try manual entry with sample data. Upload, CSV import, and AI-assisted workflows shown in the preview are planned.",
  disclaimer:
    "Product preview with sample data only. Planned workflows may change before launch. Do not enter real financial information.",
} as const;

export const FEATURES = {
  title: "Everything you need to track spending",
  subtitle:
    "Built for the way you actually spend - manual entry today, with receipt upload and CSV import planned for early access.",
  cards: [
    {
      id: "manual",
      title: "Add expenses instantly",
      subtitle: "Manual entry, your way",
      description:
        "Enter any expense in seconds: date, merchant, amount, category, payment method, notes, and tags. No bank required.",
      accent: "var(--decorative)",
      size: "large" as const,
      icon: "PlusCircle",
      stat: "Fast manual entry",
    },
    {
      id: "upload",
      title: "Receipt upload planned",
      subtitle: "Roadmap for early access",
      description:
        "Receipt and screenshot upload is planned. When available, you will review extracted details before anything is saved.",
      accent: "#A78BFA",
      size: "large" as const,
      icon: "Upload",
      stat: "Upload planned",
    },
    {
      id: "ai",
      title: "AI-assisted categorization planned",
      subtitle: "Assistive, not automatic",
      description:
        "AI-assisted suggestions are planned. Your rules and manual review stay in control before any suggestion is applied.",
      accent: "#60A5FA",
      size: "small" as const,
      icon: "Sparkles",
      stat: "Planned assistant",
    },
    {
      id: "csv",
      title: "CSV import planned",
      subtitle: "Bring your own data",
      description:
        "CSV import is planned for early access so you can map columns, preview rows, and control what gets imported.",
      accent: "#34D399",
      size: "small" as const,
      icon: "FileSpreadsheet",
      stat: "CSV planned",
    },
    {
      id: "recurring",
      title: "Recurring expense detection planned",
      subtitle: "Spot what repeats",
      description:
        "Recurring detection is planned to highlight charges that appear monthly, including subscriptions, memberships, and services you may have forgotten.",
      accent: "#FB923C",
      size: "small" as const,
      icon: "RefreshCw",
      stat: "Detection planned",
    },
    {
      id: "reports",
      title: "Monthly spending summaries",
      subtitle: "One clear picture",
      description:
        "See total spent, top categories, top merchants, and possible hidden fees. Self-serve export is planned for a later release.",
      accent: "#F472B6",
      size: "small" as const,
      icon: "BarChart2",
      stat: "Export planned",
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  title: "Simple to start, useful every day",
  steps: [
    {
      number: "01",
      title: "Add your expenses",
      description:
        "Enter expenses manually today. Receipt upload and CSV import are planned for early access. No bank login needed.",
      icon: "PlusCircle",
    },
    {
      number: "02",
      title: "Review and organize",
      description:
        "Review and organize entries yourself. AI-assisted category suggestions are planned and will remain user-reviewed.",
      icon: "CheckSquare",
    },
    {
      number: "03",
      title: "Understand your spending",
      description:
        "See spending by category, merchant, and month. Spot small charges that add up. Self-serve export is planned.",
      icon: "TrendingUp",
    },
  ],
} as const;

export const SECURITY = {
  title: "No bank connection required.",
  subtitle:
    "EXPOZOR does not ask for your bank login, does not move money, and does not collect bank credentials. You decide what you enter, edit, or delete.",
  badges: [
    { label: "No bank login required", icon: "ShieldOff" },
    { label: "Tracks expenses only", icon: "Ban" },
    { label: "Encrypted in transit (HTTPS)", icon: "Lock" },
    { label: "User-reviewed data", icon: "Eye" },
    { label: "Limited data collection", icon: "Database" },
    { label: "Deletion requests by email", icon: "Trash2" },
  ],
} as const;

export const PRICING = {
  title: "Join early access for free",
  subtitle:
    "EXPOZOR is waitlist-only today. There is no billing, no paid subscription, and no credit card required.",
  offer: {
    name: "EXPOZOR early access",
    badge: "Waitlist open",
    price: "$0",
    priceNote: "to join the waitlist",
    cta: "Join early access",
    features: [
      "Try the public local demo with sample data",
      "Receive launch invitations and product updates",
      "Manual expense tracking is the first release workflow",
      "No bank login or credit card required",
    ],
  },
  stages: [
    {
      id: "available",
      label: "Available now",
      title: "Interactive local demo",
      description: "Try the expense-entry flow with sample data. Nothing is uploaded or saved.",
    },
    {
      id: "first-release",
      label: "First release",
      title: "Manual expense tracking",
      description: "Early access starts with direct, user-controlled expense entry.",
    },
    {
      id: "roadmap",
      label: "On the roadmap",
      title: "Upload, CSV import, and AI assistance",
      description: "These workflows will arrive only when they are ready for clear user review.",
    },
  ],
  note: "Paid plans are not available. Confirmed features and prices will be published before EXPOZOR accepts payment.",
} as const;

export const FAQ = {
  title: "Questions, answered.",
  items: [
    {
      id: "faq-no-bank",
      question: "Do I need to connect my bank?",
      answer:
        "No. EXPOZOR is designed to work without bank connections. The current site is waitlist-only; manual entry is the core planned workflow, with receipt upload and CSV import planned for early access.",
    },
    {
      id: "faq-credentials",
      question: "Does EXPOZOR collect my bank login?",
      answer: "No. EXPOZOR does not require or collect bank login credentials of any kind.",
    },
    {
      id: "faq-money",
      question: "Does EXPOZOR move, hold, or transfer money?",
      answer:
        "No. EXPOZOR is only for tracking and understanding expenses. It does not move, custody, transmit, or manage funds.",
    },
    {
      id: "faq-advice",
      question: "Is EXPOZOR financial advice?",
      answer:
        "No. EXPOZOR provides organization, categorization, and spending insights for informational purposes only. It does not provide financial, investment, tax, legal, accounting, credit, or professional advice of any kind.",
    },
    {
      id: "faq-ai",
      question: "Can AI or OCR make mistakes?",
      answer:
        "Yes. AI/OCR features are planned as assistive tools and may be inaccurate. Users should always review and edit extracted or categorized data before relying on it.",
    },
    {
      id: "faq-export",
      question: "Can I export or delete my data?",
      answer:
        "Self-serve export is planned for a later release. To request a copy or deletion of waitlist data, contact us at the email listed on the Contact page.",
    },
    {
      id: "faq-upload",
      question: "What can I upload?",
      answer:
        "Uploads are not live yet. Receipt images, transaction screenshots, and CSV import are planned for early access; manual entry remains the core workflow.",
    },
    {
      id: "faq-cancel",
      question: "What happens if I cancel?",
      answer:
        "Billing is not live yet and no payments are collected from the waitlist. If you join early access, you can contact support to request waitlist data changes or deletion.",
    },
  ],
} as const;

export const FINAL_CTA = {
  headline: "Stop guessing where your money went.",
  subhead: "Join early access and follow EXPOZOR as it moves toward launch.",
  cta: "Join early access",
  ctaAriaLabel: "Join early access with EXPOZOR",
  bullets: [
    "No bank connection required",
    "Receipt upload and CSV import planned",
    "Understand your spending clearly",
  ],
  microcopy: "No bank login required - no credit card needed for early access",
} as const;

export const FOOTER = {
  tagline: "Know where your money is really going.",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Demo", href: "/demo" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
        { label: "Changelog", href: "/changelog" },
        { label: "Download", href: "/download" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Refund & Cancellation", href: "/legal/refund" },
        { label: "Security", href: "/security" },
        { label: "Subprocessors", href: "/legal/subprocessors" },
        { label: "Cookie Policy", href: "/legal/cookies" },
        { label: "Disclaimer", href: "/legal/disclaimer" },
      ],
    },
  ],
  socials: [
    { label: "Twitter / X", href: "https://twitter.com/expozor", icon: "Twitter" },
    { label: "GitHub", href: "https://github.com/expozor", icon: "Github" },
  ],
  legal: "Copyright 2026 EXPOZOR. All rights reserved.",
  madeWith: "",
} as const;
