/**
 * /content/landing.ts
 * Single source of truth for all copy on the landing page.
 * Edit here; components pull from this file.
 */

export const HERO = {
  badge: "✦ Expense Tracking, Simplified",
  headline: "Know where your money is really going.",
  displayWord: "really", // gradient applied to this word in the headline
  subhead:
    "Track expenses, spot hidden fees, and understand your spending — no bank connection required.",
  cta: "Join early access",
  ctaAriaLabel: "Join EXPOZOR early access",
  secondaryCta: "See how it works",
  secondaryCtaAriaLabel: "See how EXPOZOR works",
  microcopy: "No bank login required. No credit card needed to get started.",
  inputPlaceholder: "you@example.com",
} as const;

export const NAVBAR = {
  logo: "EXPOZOR",
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "/security" },
    { label: "Changelog", href: "/changelog" },
  ],
  cta: { label: "Get early access", href: "#waitlist" },
  signIn: { label: "Sign in", href: "/sign-in" },
} as const;

export const PRESS = {
  heading: "Built with",
  items: [] as { name: string; url: string }[],
} as const;

export const DEMO = {
  badge: "Interactive demo",
  title: "See it in action",
  description:
    "Add an expense, watch EXPOZOR organize it, and see your spending summary update. No account needed.",
  // Safer: do not promise "nothing is saved or transmitted" because analytics,
  // logging, or server actions may run. Be honest instead.
  disclaimer: "Sample data only. Do not enter real financial information in the demo.",
} as const;

export const FEATURES = {
  title: "Everything you need to track spending",
  subtitle: "Built for the way you actually spend — manual entry, receipts, screenshots, or CSV.",
  cards: [
    {
      id: "manual",
      title: "Add expenses instantly",
      subtitle: "Manual entry, your way",
      description:
        "Enter any expense in seconds — date, merchant, amount, category, payment method, notes, and tags. No bank required.",
      accent: "#3DDC97",
      size: "large" as const,
      icon: "PlusCircle",
      stat: "Fast manual entry",
    },
    {
      id: "upload",
      title: "Upload receipts & screenshots",
      subtitle: "Drop in any image or PDF",
      description:
        "Upload a receipt, transaction screenshot, or PDF. EXPOZOR extracts details with AI/OCR — you review and confirm before anything is saved.",
      accent: "#A78BFA",
      size: "large" as const,
      icon: "Upload",
      stat: "Receipt, screenshot, PDF",
    },
    {
      id: "ai",
      title: "AI-assisted categorization",
      subtitle: "Assistive, not automatic",
      description:
        "AI suggests categories and flags recurring charges or possible fees. You review every suggestion before it is applied.",
      accent: "#60A5FA",
      size: "small" as const,
      icon: "Sparkles",
      stat: "User-reviewed always",
    },
    {
      id: "csv",
      title: "CSV import",
      subtitle: "Bring your own data",
      description:
        "Import from any CSV export — map columns, preview rows, confirm. Full control over what gets imported.",
      accent: "#34D399",
      size: "small" as const,
      icon: "FileSpreadsheet",
      stat: "Any CSV format",
    },
    {
      id: "recurring",
      title: "Recurring expense detection",
      subtitle: "Spot what repeats",
      description:
        "EXPOZOR highlights charges that appear monthly — subscriptions, memberships, and services you may have forgotten.",
      accent: "#FB923C",
      size: "small" as const,
      icon: "RefreshCw",
      stat: "Subscription awareness",
    },
    {
      id: "reports",
      title: "Monthly spending summaries",
      subtitle: "One clear picture",
      description:
        "See total spent, top categories, top merchants, and possible hidden fees. Export support is planned before public launch.",
      accent: "#F472B6",
      size: "small" as const,
      icon: "BarChart2",
      // TODO: upgrade stat to "Export anytime" once CSV export is confirmed working
      stat: "Export support",
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
        "Enter expenses manually, upload receipts or transaction screenshots, or import a CSV file. No bank login needed.",
      icon: "PlusCircle",
    },
    {
      number: "02",
      title: "Review and organize",
      description:
        "EXPOZOR suggests categories and flags recurring charges and possible fees. You review and edit everything before it is saved.",
      icon: "CheckSquare",
    },
    {
      number: "03",
      title: "Understand your spending",
      description:
        "See spending by category, merchant, and month. Spot small charges that add up. Export a clean summary any time.",
      icon: "TrendingUp",
    },
  ],
} as const;

export const SECURITY = {
  title: "No bank connection required.",
  subtitle:
    "EXPOZOR does not ask for your bank login, does not move money, and does not collect bank credentials. You decide what you enter, upload, import, edit, export, or delete.",
  badges: [
    { label: "No bank login required", icon: "ShieldOff" },
    { label: "No money movement", icon: "Ban" },
    { label: "Encrypted in transit (HTTPS)", icon: "Lock" },
    { label: "User-reviewed data", icon: "Eye" },
    // TODO: upgrade to "Data export available" once export is confirmed working
    { label: "Export support", icon: "Download" },
    // TODO: confirm support email/process before launch
    { label: "Deletion requests supported", icon: "Trash2" },
  ],
} as const;

/* TESTIMONIALS removed — no fabricated reviews.
   Will be added when real user feedback is collected. */

export const PRICING = {
  title: "Simple, honest pricing",
  subtitle: "Join early access. Upgrade when billing goes live.",
  annualDiscount: 20,
  tiers: [
    {
      id: "free",
      name: "Free",
      tagline: "Get started for nothing",
      priceMonthly: 0,
      priceAnnual: 0,
      cta: "Join early access",
      ctaVariant: "ghost" as const,
      highlight: false,
      features: [
        "Manual expense entry",
        "Receipt upload",
        "90-day expense history",
        "Basic categories",
        "Monthly summary",
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "For the serious tracker",
      priceMonthly: 6,
      priceAnnual: 4.8,
      cta: "Join early access",
      ctaVariant: "ghost" as const,
      highlight: false,
      features: [
        "Unlimited expense history",
        "Receipt scanning (AI/OCR)",
        "CSV import",
        "AI-assisted categorization",
        "Recurring expense detection",
        "Monthly spending summaries",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For power users & freelancers",
      priceMonthly: 14,
      priceAnnual: 11.2,
      cta: "Join early access",
      ctaVariant: "primary" as const,
      highlight: true,
      badge: "Most popular",
      features: [
        "Everything in Plus",
        "AI spending insights",
        // TODO: confirm tax export is implemented before launch
        "Export support",
        "API access",
        "Priority support",
        "Early access to new features",
      ],
    },
    {
      id: "family",
      name: "Family",
      tagline: "Shared finances, made easy",
      priceMonthly: 24,
      priceAnnual: 19.2,
      cta: "Join early access",
      ctaVariant: "ghost" as const,
      highlight: false,
      features: [
        "Everything in Pro",
        "Up to 6 members",
        "Shared + private expense views",
        "Family spending dashboard",
        "Per-member privacy controls",
      ],
    },
  ],
  comparisonFeatures: [
    { label: "Manual expense entry", free: "✓", plus: "✓", pro: "✓", family: "✓" },
    { label: "Receipt upload", free: "✓", plus: "✓", pro: "✓", family: "✓" },
    { label: "CSV import", free: "—", plus: "✓", pro: "✓", family: "✓" },
    { label: "AI categorization", free: "—", plus: "✓", pro: "✓", family: "✓" },
    { label: "Monthly summaries", free: "✓", plus: "✓", pro: "✓", family: "✓" },
    { label: "AI spending insights", free: "—", plus: "—", pro: "✓", family: "✓" },
    { label: "Export support", free: "—", plus: "—", pro: "✓", family: "✓" },
    { label: "API access", free: "—", plus: "—", pro: "✓", family: "✓" },
    { label: "Shared expense views", free: "—", plus: "—", pro: "—", family: "✓" },
    { label: "Family dashboard", free: "—", plus: "—", pro: "—", family: "✓" },
  ],
} as const;

export const FAQ = {
  title: "Questions, answered.",
  items: [
    {
      id: "faq-no-bank",
      question: "Do I need to connect my bank?",
      answer:
        "No. EXPOZOR is designed to work without bank connections. You can add expenses manually, upload receipts or screenshots, or import CSV files.",
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
        "No. EXPOZOR is only for tracking and understanding expenses. It does not move, hold, transmit, or manage funds.",
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
        "Yes. AI/OCR features are assistive and may be inaccurate. Users should always review and edit extracted or categorized data before relying on it.",
    },
    {
      id: "faq-export",
      question: "Can I export or delete my data?",
      // TODO: update this answer once export implementation is confirmed and support email is live
      // If export IS implemented: "Yes. You can export your expense data from your account settings."
      // If export is NOT yet implemented, use the safer version below:
      answer:
        "Export support is planned before public launch. To request a copy of your data, contact us at the email listed on the Contact page.",
    },
    {
      id: "faq-upload",
      question: "What can I upload?",
      answer:
        "Receipts, transaction screenshots, and CSV files. You can also enter expenses manually at any time.",
    },
    {
      id: "faq-cancel",
      question: "What happens if I cancel?",
      // TODO: update when billing is live to confirm free-tier retention and export availability
      answer:
        "Billing is not live yet. Paid-plan cancellation terms will be finalized before launch. If you join early access, you can contact support to request account or data changes.",
    },
  ],
} as const;

export const FINAL_CTA = {
  headline: "Stop guessing where your money went.",
  subhead: "Join early access and start tracking your spending today.",
  cta: "Join early access",
  ctaAriaLabel: "Join EXPOZOR early access",
  bullets: [
    "No bank connection required",
    "Upload receipts or import CSV",
    "Understand your spending clearly",
  ],
  // TODO: update microcopy when billing goes live
  microcopy: "No bank login required · No credit card needed for early access",
} as const;

export const FOOTER = {
  tagline: "Know where your money is really going.",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "/features" },
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
  // Do NOT write "EXPOZOR, Inc." or "EXPOZOR LLC" — legal entity not yet formed
  // TODO: update legal entity name after LLC formation and EIN issuance.
  legal: "© 2026 EXPOZOR. All rights reserved.",
  madeWith: "",
} as const;
