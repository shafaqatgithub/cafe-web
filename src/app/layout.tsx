import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { HERO_VIDEO } from "@/data/media";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Ember & Crumb — Wood-fired Kitchen & Coffee Bar";
const description =
  "Made slow, served fresh. Ember & Crumb is a wood-fired pizzeria, burger kitchen and specialty coffee bar — seventy-two-hour dough, a 450 °C oak-fired oven and single-origin espresso.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ember & Crumb",
  keywords: ["wood-fired pizza", "artisan burgers", "specialty coffee", "café", "pizzeria", "desserts"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ember & Crumb",
    title,
    description,
    locale: "en_US",
    images: [{ url: "/assets/pizza-sequence/pizza-001.jpg", width: 640, height: 360, alt: "Wood-fired pizza at Ember & Crumb." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/pizza-sequence/pizza-001.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the `js` class before React hydrates.
    <html lang="en" className={`${instrument.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Lets the hero hide its entrance states before first paint (no flash of
            un-animated content). Safety net: if JS never runs, content shows after 4s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.remove('js')},4000);",
          }}
        />
        {/* The hero poster is the LCP candidate — fetch it before JS boots. */}
        <link rel="preload" as="image" href={HERO_VIDEO.poster} fetchPriority="high" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-espresso focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
