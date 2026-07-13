import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { Globe, Smartphone } from "lucide-react";
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
          <PageHero
            eyebrow="Download"
            title="EXPOZOR on every screen."
            description="Join the waitlist for web early access and mobile app updates."
            align="center"
            scale="editorial"
            className="mb-16"
          />

          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Web app",
                description:
                  "Early-access web experience planned first. No app-store download required.",
                cta: "Join the waitlist",
                href: "/#waitlist",
                accent: BRAND_COLORS.lilac,
                badge: "Waitlist",
              },
              {
                icon: Smartphone,
                title: "iOS",
                description: "Native iPhone app planned, including receipt capture workflows.",
                cta: "Notify me when available",
                href: "/#waitlist",
                accent: "#60a5fa",
                badge: "Coming soon",
              },
              {
                icon: Smartphone,
                title: "Android",
                description:
                  "Native Android app planned, including camera-assisted expense capture.",
                cta: "Notify me when available",
                href: "/#waitlist",
                accent: "#a78bfa",
                badge: "Coming soon",
              },
            ].map((platform) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.title}
                  className="glass rounded-lg p-6 border border-border flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center"
                      style={{
                        background: `${platform.accent}1A`,
                        border: `1px solid ${platform.accent}33`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: platform.accent }} />
                    </div>
                    <span
                      className="px-2 py-0.5 text-xs font-semibold rounded-full border"
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
                    <h2 className="font-bold text-xl text-text-primary mb-1">{platform.title}</h2>
                    <p className="text-sm text-text-secondary">{platform.description}</p>
                  </div>
                  <a
                    href={platform.href}
                    className="mt-auto block w-full py-2.5 rounded text-sm font-semibold text-center bg-bg-elevated text-text-primary border border-border hover:border-border-strong transition-all"
                  >
                    {platform.cta}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Mobile app availability notice */}
          <div className="flex flex-col items-center gap-3 mt-16 text-center">
            <div
              className="w-12 h-12 rounded flex items-center justify-center"
              style={{
                background: "var(--accent-subtle)",
                border: "1px solid var(--border-accent)",
              }}
              aria-hidden="true"
            >
              <Smartphone size={20} style={{ color: "var(--accent)" }} />
            </div>
            <p className="text-sm text-text-secondary max-w-xs">
              Mobile apps are in development. Join the waitlist to be notified when iOS and Android
              are available.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
