import type { ReactNode } from "react";

/** Small uppercase label with an index, e.g. "(03) — Crafted with patience". */
export default function SectionLabel({
  index,
  children,
  className = "",
  tone = "accent",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: "accent" | "muted" | "light";
}) {
  const color = tone === "accent" ? "text-terracotta" : tone === "light" ? "text-paper/70" : "text-muted";
  return (
    <p data-reveal className={`label flex items-center gap-3 ${color} ${className}`}>
      {index && <span className="tabular">({index})</span>}
      {index && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}
