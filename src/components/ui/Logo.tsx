/** Wordmark: an oven-mouth arch with an ember, set beside the name. */
export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const ink = tone === "dark" ? "text-espresso" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-2.5 ${ink} ${className}`}>
      <svg aria-hidden viewBox="0 0 24 26" className="h-6.5 w-6">
        <path d="M2 25V12a10 10 0 0 1 20 0v13" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2 25h20" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 13.5c2.2 2.2 2.6 4.1 1.5 5.6-.8 1.1-2.2 1.1-3 0-1-1.4-.5-3.3 1.5-5.6Z" className="fill-terracotta" />
      </svg>
      <span className="display text-[1.55rem] leading-none tracking-[-0.01em]">
        Ember <em className="italic">&amp;</em> Crumb
      </span>
    </span>
  );
}
