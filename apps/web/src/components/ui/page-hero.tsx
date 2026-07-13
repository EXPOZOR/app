import clsx from "clsx";
import type { ReactNode } from "react";

type PageHeroScale = "display" | "editorial" | "compact";

interface PageHeroProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "start" | "center";
  scale?: PageHeroScale;
  className?: string;
  descriptionClassName?: string;
}

const titleScaleClasses: Record<PageHeroScale, string | undefined> = {
  display: undefined,
  editorial: "type-page-title-editorial",
  compact: "type-page-title-compact",
};

export function PageHero({
  title,
  eyebrow,
  description,
  children,
  align = "start",
  scale = "display",
  className,
  descriptionClassName,
}: PageHeroProps) {
  const defaultDescriptionClass = scale === "compact" ? "type-body-lg" : "type-lede";

  return (
    <header className={clsx("page-hero", align === "center" && "page-hero-center", className)}>
      {eyebrow && <p className="type-eyebrow type-eyebrow-accent">{eyebrow}</p>}
      <h1 className={clsx("type-page-title", titleScaleClasses[scale])}>{title}</h1>
      {description && (
        <p
          className={clsx("page-hero-description", descriptionClassName ?? defaultDescriptionClass)}
        >
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
