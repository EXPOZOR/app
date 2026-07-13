import { PostCard } from "@/components/blog/post-card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { getAllBlogPosts, getBlogCategories } from "@/lib/mdx";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { Rss } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on personal finance, AI, product updates, and the story behind EXPOZOR. Read the latest from the team.",
  alternates: { canonical: "https://expozor.com/blog" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Blog", href: "/blog" }]);

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();
  const featuredPost = posts.find((p) => p.frontmatter.featured);
  const regularPosts = posts.filter((p) => !p.frontmatter.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <div className="container-site measure-section page-hero-py">
          <PageHero
            eyebrow="Blog"
            title="Insights & updates"
            description="From the team building EXPOZOR — product updates, engineering deep-dives, and thoughts on personal finance."
            align="center"
          >
            <div className="mt-6">
              <a
                href="/blog/rss.xml"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                aria-label="Subscribe to RSS feed"
              >
                <Rss size={14} aria-hidden="true" />
                RSS Feed
              </a>
            </div>
          </PageHero>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <div className="container-site mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-[var(--accent)] text-[var(--text-inverse)]">
                All
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 text-sm font-medium rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] transition-colors cursor-default"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Featured post */}
        {featuredPost && (
          <section className="container-site mb-12" aria-label="Featured post">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-widest font-semibold text-[var(--text-tertiary)] mb-3">
                Featured
              </p>
              <PostCard post={featuredPost} />
            </div>
          </section>
        )}

        {/* All posts grid */}
        <section className="container-site section-py" aria-label="All posts">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {regularPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--text-tertiary)] text-lg">No posts yet. Check back soon!</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
