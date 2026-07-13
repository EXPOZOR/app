import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";

type MDXComponents = MDXRemoteProps["components"];

/**
 * Custom MDX component overrides for blog and changelog content.
 * These map standard HTML elements to styled versions.
 */
export function useMDXComponents(): NonNullable<MDXComponents> {
  return {
    h2: (props) => <h2 className="type-article-heading mt-10 mb-4" {...props} />,
    h3: (props) => <h3 className="type-article-subheading mt-8 mb-3" {...props} />,
    p: (props) => <p className="type-body mb-5" {...props} />,
    ul: (props) => (
      <ul className="list-disc list-inside space-y-2 text-text-secondary mb-5 pl-2" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal list-inside space-y-2 text-text-secondary mb-5 pl-2" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-semibold text-text-primary" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    a: ({ href, ...props }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            className="text-accent hover:underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        );
      }
      return (
        <Link
          href={href || "#"}
          className="text-accent hover:underline underline-offset-2"
          {...props}
        />
      );
    },
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-accent pl-5 my-6 italic text-text-secondary"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="bg-bg-elevated text-accent px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="bg-bg-elevated border border-border rounded-lg p-4 overflow-x-auto mb-5 text-sm"
        {...props}
      />
    ),
    table: (props) => (
      <div className="overflow-x-auto mb-5">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="border-b border-border" {...props} />,
    th: (props) => (
      <th className="text-left py-2 px-3 font-semibold text-text-primary" {...props} />
    ),
    td: (props) => (
      <td className="py-2 px-3 text-text-secondary border-b border-border" {...props} />
    ),
    hr: () => <hr className="border-border my-8" />,
    img: ({ src, alt = "", width, height, ...props }) => (
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt}
        width={typeof width === "number" ? width : 1200}
        height={typeof height === "number" ? height : 630}
        sizes="(min-width: 768px) 720px, 100vw"
        className="rounded-lg border border-border my-6 w-full h-auto"
        {...props}
      />
    ),
  };
}
