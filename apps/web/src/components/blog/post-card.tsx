import Link from "next/link";
import type { BlogPost } from "@/lib/mdx";
import { Clock, ArrowRight } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Company: "#7CF5C2",
  Engineering: "#60a5fa",
  Security: "#a78bfa",
  Product: "#FFB36B",
  Design: "#f472b6",
};

export function PostCard({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.frontmatter.category] || "#7CF5C2";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-surface)] p-6 hover:border-[var(--border-strong)] transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
    >
      {/* Category + reading time */}
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
        <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
          <Clock size={12} aria-hidden="true" />
          {post.readingTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors leading-tight">
        {post.frontmatter.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
        {post.frontmatter.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {post.frontmatter.author}
          </p>
          <time
            className="text-xs text-[var(--text-tertiary)]"
            dateTime={post.frontmatter.date}
          >
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          Read
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
