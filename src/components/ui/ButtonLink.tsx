import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-1">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Server-renderable link button. In-page hashes are routed through Lenis by
 * <SmoothScroll />. The label "rolls" on hover with CSS only — no JS per button.
 */
export default function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  if (variant === "secondary") {
    return (
      <a
        href={href}
        className={`group inline-flex min-h-11 items-center gap-2.5 text-sm font-medium text-espresso ${className}`}
      >
        <span className="relative">
          {children}
          <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-25" />
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-700 ease-expo group-hover:origin-left group-hover:scale-x-100"
          />
        </span>
        <Arrow />
      </a>
    );
  }

  const tone =
    variant === "light"
      ? "bg-paper text-espresso hover:bg-terracotta hover:text-paper"
      : "bg-espresso text-paper hover:bg-terracotta";

  return (
    <a
      href={href}
      className={`group relative inline-flex h-13 items-center gap-3 overflow-hidden rounded-full pl-7 pr-6 text-sm font-medium tracking-wide transition-colors duration-500 ease-expo ${tone} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <Arrow />
    </a>
  );
}
