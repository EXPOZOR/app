import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostHeader } from "@/components/blog/post-header";
import { PostCard } from "@/components/blog/post-card";
import { getAllBlogPosts, getBlogPost } from "@/lib/mdx";
import { useMDXComponents } from "@/components/blog/mdx-components";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { MDXRemote } from "next-mdx-remote/rsc";

/* ── Static params ─────────────────────────────────────────── */

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/* ── Metadata ──────────────────────────────────────────────── */

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPost(slug);
    if (!post) return { title: "Post Not Found" };

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      alternates: { canonical: `https://expozor.app/blog/${slug}` },
      openGraph: {
        type: "article",
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        url: `https://expozor.app/blog/${slug}`,
        publishedTime: post.frontmatter.date,
        authors: [post.frontmatter.author],
        tags: [post.frontmatter.category],
      },
      twitter: {
        card: "summary_large_image",
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
      },
    };
  });
}

/* ── Page ──────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Blog", href: "/blog" },
    { name: post.frontmatter.title, href: `/blog/${slug}` },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "EXPOZOR",
      url: "https://expozor.app",
    },
    url: `https://expozor.app/blog/${slug}`,
  };

  const components = useMDXComponents();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD
        dangerouslySetInnerHTML={{
          __html: jsonLdString(breadcrumb, articleJsonLd),
        }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <article className="container-site max-w-3xl section-py">
          <PostHeader post={post} />

          {/* MDX content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section
            className="container-site max-w-3xl pb-20"
            aria-label="Related posts"
          >
            <div className="pt-10 border-t border-[var(--border)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                Keep reading
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {relatedPosts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
