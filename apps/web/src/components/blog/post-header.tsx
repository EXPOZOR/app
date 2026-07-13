import { BRAND_COLORS } from "@/lib/brand-colors";
import type { BlogPost } from "@/lib/mdx";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  Company: BRAND_COLORS.lilac,
  Engineering: "#60a5fa",
  Security: "#a78bfa",
  Product: "#FFB36B",
  Design: "#f472b6",
};

export function PostHeader({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.frontmatter.category] || BRAND_COLORS.lilac;

  return (
    <header className="mb-10">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All posts
      </Link>

      {/* Category */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: `${color}1A`,
            color,
            border: `1px solid ${color}33`,
          }}
        >
          {post.frontmatter.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="type-article-title mb-4">{post.frontmatter.title}</h1>

      {/* Excerpt */}
      <p className="type-lede mb-6 max-w-2xl">{post.frontmatter.excerpt}</p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)] pb-8 border-b border-[var(--border)]">
        <div>
          <span className="font-medium text-[var(--text-primary)]">{post.frontmatter.author}</span>
          {post.frontmatter.authorRole && (
            <span className="ml-1 text-[var(--text-tertiary)]">
              · {post.frontmatter.authorRole}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1">
          <Calendar size={14} aria-hidden="true" />
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} aria-hidden="true" />
          {post.readingTime}
        </span>
      </div>
    </header>
  );
}
