import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Founder from "@/components/Founder";
import WhyUs from "@/components/WhyUs";
import { Experience, Approach, CTA } from "@/components/CompanySections";
import Contact from "@/components/Contact";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main>
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Experience />
      <Approach />
      <CTA />
      <Process />
      <Founder />
      <WhyUs />
      <Contact />
      <Profile />
      <Footer />
    </main>
  );
}
