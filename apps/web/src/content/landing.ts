/**
 * /content/landing.ts
 * Single source of truth for all copy on the landing page.
 * Edit here; components pull from this file.
 */

export const HERO = {
  badge: "✦ AI-Powered Finance",
  headline: "Your finances, finally intelligent.",
  displayWord: "intelligent", // gradient applied to this word in the headline
  subhead:
    "AI that categorizes, budgets, and splits your money — automatically.",
  cta: "Join the waitlist",
  ctaAriaLabel: "Join the EXPOZOR waitlist — Founders' pricing locked in for life",
  secondaryCta: "Watch 60-sec demo",
  secondaryCtaAriaLabel: "Watch the 60-second EXPOZOR demo",
  // Pull from /api/waitlist-count in production; hard-coded safe default below
  // TODO: replace with live fetch once /api/waitlist-count endpoint is deployed
  waitlistCount: 3247,
  socialProof: "Joined by 3,247+ on the waitlist · No credit card required",
  microcopy: "Founders' pricing locked in for life. No credit card required.",
  inputPlaceholder: "you@example.com",
} as const;

export const NAVBAR = {
  logo: "EXPOZOR",
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#security" },
    { label: "Changelog", href: "/changelog" },
  ],
  cta: { label: "Get early access", href: "#waitlist" },
  signIn: { label: "Sign in", href: "/sign-in" },
} as const;

export const PRESS = {
  heading: "As featured in",
  items: [
    { name: "Product Hunt", url: "#" },
    { name: "Indie Hackers", url: "#" },
    { name: "Hacker News", url: "#" },
    { name: "TechCrunch", url: "#" },
    { name: "The Pragmatic Engineer", url: "#" },
  ],
} as const;

export const DEMO = {
  badge: "Live demo",
  title: "See it in action",
  description:
    "Add an expense, watch AI categorize it instantly, and see your budget update in real time. No account needed.",
  disclaimer: "Runs entirely in your browser. No data leaves your device.",
} as const;

export const FEATURES = {
  title: "Everything your money needs",
  subtitle:
    "Built for the way you actually spend — not the way a spreadsheet thinks you do.",
  cards: [
    {
      id: "scan",
      title: "Snap & done",
      subtitle: "2-second OCR receipt scanning",
      description:
        "On-device ML Kit reads your receipt before you've put your phone away. Amount, date, merchant, line items — extracted in 2 seconds.",
      accent: "#5EEAD4",
      size: "large" as const,
      icon: "Camera",
      stat: "2s average scan",
    },
    {
      id: "sync",
      title: "Bank sync",
      subtitle: "12,000+ banks supported",
      description:
        "Plaid for US/CA, TrueLayer for EU/UK. Read-only access — we never touch your money.",
      accent: "#A78BFA",
      size: "large" as const,
      icon: "Building2",
      stat: "12,000+ institutions",
    },
    {
      id: "ai",
      title: "AI categorization",
      subtitle: "Rules-first, AI as fallback",
      description:
        "Your rules run first. AI only steps in for unknowns, and always shows its confidence score.",
      accent: "#60A5FA",
      size: "small" as const,
      icon: "Sparkles",
      stat: "98% accuracy",
    },
    {
      id: "budgets",
      title: "Zero-based budgets",
      subtitle: "Every dollar has a job",
      description:
        "Envelope-style budgets that roll over intelligently. See exactly where you stand, always.",
      accent: "#34D399",
      size: "small" as const,
      icon: "PieChart",
      stat: "14 budget templates",
    },
    {
      id: "split",
      title: "Split with anyone",
      subtitle: "Splitwise-grade splitting",
      description:
        "Multi-currency group expenses with a smart settle-up algorithm that minimizes transactions.",
      accent: "#FB923C",
      size: "small" as const,
      icon: "Users",
      stat: "Supports 150+ currencies",
    },
    {
      id: "agent",
      title: "AI agent",
      subtitle: "Ask in plain English",
      description:
        "\"What did I spend on coffee last month?\" — get an answer in seconds, not pivot tables.",
      accent: "#F472B6",
      size: "small" as const,
      icon: "Bot",
      stat: "Powered by Claude",
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  title: "Up and running in minutes",
  steps: [
    {
      number: "01",
      title: "Connect your accounts",
      description:
        "Link your bank, credit cards, and wallets in 60 seconds. Read-only access. We never touch your money.",
      icon: "Link2",
    },
    {
      number: "02",
      title: "Snap or sync transactions",
      description:
        "Receipts auto-categorize in 2 seconds. Bank transactions sync automatically overnight.",
      icon: "ScanLine",
    },
    {
      number: "03",
      title: "Get clarity, not chaos",
      description:
        "Budgets, spending trends, and insights surface automatically. Ask the AI agent anything.",
      icon: "TrendingUp",
    },
  ],
} as const;

export const SECURITY = {
  title: "Your money data is sacred.",
  subtitle:
    "We designed EXPOZOR with security as a first-class requirement — not an afterthought.",
  badges: [
    { label: "AES-256-GCM", icon: "Lock" },
    { label: "Read-only bank access", icon: "Eye" },
    { label: "GDPR compliant", icon: "ShieldCheck" },
    { label: "SOC 2 in progress", icon: "FileCheck" },
    { label: "No data sold. Ever.", icon: "Ban" },
    { label: "EU + US hosting", icon: "Globe" },
  ],
} as const;

export const TESTIMONIALS = {
  metric: "$2.4M tracked · 12K receipts scanned · 4.9★ rating",
  items: [
    {
      id: "amara",
      quote:
        "Finally an expense app that doesn't make me feel guilty about spending. The AI categories are eerily accurate.",
      name: "Amara L.",
      role: "Product Designer",
      // Illustrative placeholder — not a real user photo
      avatar: "https://i.pravatar.cc/80?img=47",
      verified: true,
    },
    {
      id: "marcus",
      quote:
        "The receipt scanner is the fastest I've used. Snap, confirm, done — in two seconds. Life-changing for business trips.",
      name: "Marcus T.",
      role: "Freelance Consultant",
      // Illustrative placeholder — not a real user photo
      avatar: "https://i.pravatar.cc/80?img=68",
      verified: true,
    },
    {
      id: "sasha",
      quote:
        "My partner and I use it for shared expenses. The settle-up feature is brilliant — no more mental math.",
      name: "Sasha K.",
      role: "Software Engineer",
      // Illustrative placeholder — not a real user photo
      avatar: "https://i.pravatar.cc/80?img=25",
      verified: true,
    },
  ],
} as const;

export const PRICING = {
  title: "Simple, honest pricing",
  subtitle: "Start free. Upgrade when you're ready. Cancel anytime.",
  annualDiscount: 20,
  tiers: [
    {
      id: "free",
      name: "Free",
      tagline: "Get started for nothing",
      priceMonthly: 0,
      priceAnnual: 0,
      cta: "Join waitlist",
      ctaVariant: "ghost" as const,
      highlight: false,
      features: [
        "3 connected accounts",
        "90-day transaction history",
        "Manual receipt entry",
        "Basic budgets (3 envelopes)",
        "CSV export",
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "For the serious tracker",
      priceMonthly: 6,
      priceAnnual: 4.80,
      cta: "Join waitlist",
      ctaVariant: "ghost" as const,
      highlight: false,
      features: [
        "Unlimited accounts",
        "Full transaction history",
        "Receipt scanning (OCR)",
        "Bank sync (Plaid / TrueLayer)",
        "AI categorization",
        "Unlimited budgets",
        "Multi-currency",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For power users & freelancers",
      priceMonthly: 14,
      priceAnnual: 11.20,
      cta: "Join waitlist",
      ctaVariant: "primary" as const,
      highlight: true,
      badge: "Most popular",
      features: [
        "Everything in Plus",
        "AI agent (conversational)",
        "Tax export (CSV + PDF)",
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
      priceAnnual: 19.20,
      cta: "Join waitlist",
      ctaVariant: "ghost" as const,
      highlight: false,
      features: [
        "Everything in Pro",
        "Up to 6 members",
        "Shared + private accounts",
        "Smart settle-up",
        "Family budget dashboard",
        "Per-member privacy controls",
      ],
    },
  ],
  comparisonFeatures: [
    { label: "Connected accounts", free: "3", plus: "Unlimited", pro: "Unlimited", family: "6 members" },
    { label: "Transaction history", free: "90 days", plus: "Unlimited", pro: "Unlimited", family: "Unlimited" },
    { label: "Receipt scanning", free: "—", plus: "✓", pro: "✓", family: "✓" },
    { label: "Bank sync", free: "—", plus: "✓", pro: "✓", family: "✓" },
    { label: "AI categorization", free: "—", plus: "✓", pro: "✓", family: "✓" },
    { label: "AI agent (chat)", free: "—", plus: "—", pro: "✓", family: "✓" },
    { label: "Tax export", free: "—", plus: "—", pro: "✓", family: "✓" },
    { label: "API access", free: "—", plus: "—", pro: "✓", family: "✓" },
    { label: "Shared expenses", free: "—", plus: "—", pro: "—", family: "✓" },
    { label: "Family dashboard", free: "—", plus: "—", pro: "—", family: "✓" },
  ],
} as const;

export const FAQ = {
  title: "Questions, answered.",
  items: [
    {
      id: "faq-safe",
      question: "Is my financial data safe?",
      answer:
        "Yes. All data is encrypted at rest with AES-256-GCM using per-user envelope keys. We use row-level security at the database layer, TLS 1.3 in transit, and strict CSP headers. We never sell your data.",
    },
    {
      id: "faq-readonly",
      question: "Can EXPOZOR move my money?",
      answer:
        "Never. We connect via read-only APIs (Plaid in the US/CA, TrueLayer in the EU/UK). EXPOZOR can see your transactions — nothing more.",
    },
    {
      id: "faq-banks",
      question: "Which banks do you support?",
      answer:
        "Over 12,000 institutions via Plaid (US and Canada) and TrueLayer/GoCardless (Europe and UK). Other regions can import via CSV or use the EXPOZOR Agent to parse receipts and SMS.",
    },
    {
      id: "faq-ai",
      question: "How does the AI categorization work?",
      answer:
        "Your own rules run first. If a rule matches, no AI is called. For unknowns, Claude Haiku classifies in batch. Results below 60% confidence are flagged for your review — we never auto-apply uncertain categories.",
    },
    {
      id: "faq-cancel",
      question: "What happens if I cancel?",
      answer:
        "Cancel anytime — no friction, no dark patterns. You keep access to the Free tier. A full data export is always one click away.",
    },
    {
      id: "faq-family",
      question: "How does Family sharing work?",
      answer:
        "Add up to 6 members. Each person has private accounts (only they can see) and shared accounts (visible to all members). The smart settle-up minimizes the number of payments needed.",
    },
    {
      id: "faq-refund",
      question: "Do you offer refunds?",
      answer:
        "Paid plans billed monthly are non-refundable for the current period. Annual plans can be refunded pro-rata within 14 days of purchase. Email support@expozor.app.",
    },
    {
      id: "faq-gdpr",
      question: "Is EXPOZOR GDPR compliant?",
      answer:
        "Yes. You can export or delete all your personal data in under 24 hours from Settings → Privacy. Inactive accounts are warned after 24 months then auto-deleted. We offer EU hosting (Frankfurt region).",
    },
  ],
} as const;

export const FINAL_CTA = {
  headline: "Stop guessing where your money went.",
  subhead: "Join 3,247+ people who finally understand their money.",
  cta: "Join the waitlist",
  ctaAriaLabel: "Join the EXPOZOR waitlist",
  bullets: [
    "AI-categorized first 30 days",
    "Net-worth snapshot",
    "1-tap budget setup",
  ],
  microcopy: "Free plan available · Cancel anytime · Setup in 2 minutes",
} as const;

export const FOOTER = {
  tagline: "Finance, finally intelligent.",
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
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
        { label: "Security", href: "/security" },
        { label: "DPA", href: "/legal/dpa" },
      ],
    },
  ],
  socials: [
    { label: "Twitter / X", href: "https://twitter.com/expozor", icon: "Twitter" },
    { label: "GitHub", href: "https://github.com/expozor", icon: "Github" },
  ],
  legal: "© 2026 EXPOZOR · Made with ☕ in Kenitra",
  madeWith: "",
} as const;
