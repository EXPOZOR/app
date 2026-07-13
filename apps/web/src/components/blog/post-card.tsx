import { BRAND_COLORS } from "@/lib/brand-colors";
import type { BlogPost } from "@/lib/mdx";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  Company: BRAND_COLORS.lilac,
  Engineering: "#60a5fa",
  Security: "#a78bfa",
  Product: "#FFB36B",
  Design: "#f472b6",
};

export function PostCard({
  post,
  headingLevel = 2,
}: {
  post: BlogPost;
  headingLevel?: 2 | 3;
}) {
  const color = CATEGORY_COLORS[post.frontmatter.category] || BRAND_COLORS.lilac;
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-bg-surface p-6 hover:border-border-strong transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
    >
      {/* Category + reading time */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="px-2.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full"
          style={{
            background: `${color}1A`,
            color,
            border: `1px solid ${color}33`,
          }}
        >
          {post.frontmatter.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-text-tertiary">
          <Clock size={12} aria-hidden="true" />
          {post.readingTime}
        </span>
      </div>

      {/* Title */}
      <Heading className="text-xl font-bold text-text-primary mb-2 group-hover:text-decorative transition-colors leading-tight">
        {post.frontmatter.title}
      </Heading>

      {/* Excerpt */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
        {post.frontmatter.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-sm font-medium text-text-primary">{post.frontmatter.author}</p>
          <time className="text-xs text-text-tertiary" dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-decorative opacity-0 group-hover:opacity-100 transition-opacity">
          Read
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
