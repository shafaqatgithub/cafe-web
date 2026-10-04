import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import ExperienceGrid from "@/components/ExperienceGrid";
import PizzaScroll from "@/components/pizza-scroll/PizzaScroll";
import MenuSection from "@/components/menu/MenuSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ExperienceGrid />
        <PizzaScroll />
        <MenuSection />
        <CTA />
      </main>
      <Footer />
      {/* Must stay last: creates page-wide reveal/parallax triggers after each section's own triggers. */}
      <ScrollAnimations />
    </>
  );
}
