import { useMDXComponents } from "@/components/blog/mdx-components";
import { PostCard } from "@/components/blog/post-card";
import { PostHeader } from "@/components/blog/post-header";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getAllBlogPosts, getBlogPost } from "@/lib/mdx";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

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
      alternates: { canonical: `https://expozor.com/blog/${slug}` },
      openGraph: {
        type: "article",
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        url: `https://expozor.com/blog/${slug}`,
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
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

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
      url: "https://expozor.com",
    },
    url: `https://expozor.com/blog/${slug}`,
  };

  const components = useMDXComponents();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(breadcrumb, articleJsonLd),
        }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <article className="container-site measure-prose section-py">
          <PostHeader post={post} />

          {/* MDX content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} components={components} />
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="container-site measure-prose pb-20" aria-label="Related posts">
            <div className="pt-10 border-t border-[var(--border)]">
              <h2 className="type-article-subheading mb-6">Keep reading</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {relatedPosts.map((p) => (
                  <PostCard key={p.slug} post={p} headingLevel={3} />
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
