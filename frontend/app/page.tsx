import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ClientMarquee from "@/components/sections/ClientMarquee";
import DigitalGrowth from "@/components/sections/DigitalGrowth";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ClientMarquee />
        <DigitalGrowth />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
