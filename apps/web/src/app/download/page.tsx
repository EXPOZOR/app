import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { Globe, QrCode, Smartphone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description: "EXPOZOR is waitlist-only today. iOS and Android apps are planned.",
  alternates: { canonical: "https://expozor.com/download" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Download", href: "/download" }]);

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site section-py">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
              Download
            </p>
            <h1 className="text-5xl font-bold tracking-tight mb-4">EXPOZOR on every screen.</h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Join the waitlist for web early access and mobile app updates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Web app",
                description:
                  "Early-access web experience planned first. No app-store download required.",
                cta: "Join the waitlist",
                href: "#waitlist",
                accent: "#7CF5C2",
                badge: "Waitlist",
              },
              {
                icon: Smartphone,
                title: "iOS",
                description: "Native iPhone app planned, including receipt capture workflows.",
                cta: "Notify me when available",
                href: "#waitlist",
                accent: "#60a5fa",
                badge: "Coming soon",
              },
              {
                icon: Smartphone,
                title: "Android",
                description:
                  "Native Android app planned, including camera-assisted expense capture.",
                cta: "Notify me when available",
                href: "#waitlist",
                accent: "#a78bfa",
                badge: "Coming soon",
              },
            ].map((platform) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.title}
                  className="glass rounded-[var(--radius-xl)] p-6 border border-[var(--border)] flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-[var(--radius)] flex items-center justify-center"
                      style={{
                        background: `${platform.accent}1A`,
                        border: `1px solid ${platform.accent}33`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: platform.accent }} />
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{
                        background: `${platform.accent}1A`,
                        borderColor: `${platform.accent}33`,
                        color: platform.accent,
                      }}
                    >
                      {platform.badge}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-[var(--text-primary)] mb-1">
                      {platform.title}
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">{platform.description}</p>
                  </div>
                  <a
                    href={platform.href}
                    className="mt-auto block w-full py-2.5 rounded-[var(--radius)] text-sm font-semibold text-center bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all"
                  >
                    {platform.cta}
                  </a>
                </div>
              );
            })}
          </div>

          {/* QR SVG placeholder */}
          <div className="flex flex-col items-center gap-4 mt-16" aria-label="QR code placeholder">
            <QrCode
              size={80}
              className="text-[var(--text-tertiary)] opacity-40"
              aria-hidden="true"
            />
            <p className="text-sm text-[var(--text-tertiary)]">
              QR codes will appear here when the mobile apps launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
