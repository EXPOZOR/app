import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

/* ── Types ─────────────────────────────────────────────────── */

export interface BlogFrontmatter {
  title: string;
  date: string;
  author: string;
  authorRole?: string;
  category: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
}

/* ── Paths ─────────────────────────────────────────────────── */

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const CHANGELOG_DIR = path.join(process.cwd(), "src/content/changelog");

/* ── Blog helpers ──────────────────────────────────────────── */

/**
 * Get all blog posts, sorted by date descending.
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      readingTime: stats.text,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get a single blog post by slug.
 */
export function getBlogPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: stats.text,
  };
}

/**
 * Get unique blog categories.
 */
export function getBlogCategories(): string[] {
  const posts = getAllBlogPosts();
  const cats = new Set(posts.map((p) => p.frontmatter.category));
  return Array.from(cats).sort();
}

/* ── Changelog helpers ─────────────────────────────────────── */

export interface ChangelogFrontmatter {
  version: string;
  date: string;
  tag: string;
  tagColor?: string;
}

export interface ChangelogEntry {
  slug: string;
  frontmatter: ChangelogFrontmatter;
  content: string;
}

/**
 * Get all changelog entries, sorted by date descending.
 */
export function getAllChangelogEntries(): ChangelogEntry[] {
  if (!fs.existsSync(CHANGELOG_DIR)) return [];

  const files = fs
    .readdirSync(CHANGELOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CHANGELOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: data as ChangelogFrontmatter,
      content,
    };
  });

  return entries.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}
