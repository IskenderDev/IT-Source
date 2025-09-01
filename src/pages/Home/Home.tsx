import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Home/Hero/Hero";
import About from "../../components/Home/About/About";
import ServicesCarousel from "../../components/Home/Carousels/ServicesCarousel";
import Features from "../../components/Home/ListFeatures/Features";
import Brands from "../../components/Home/Brands/Brands";
import ExpertiseCarousel from "../../components/Home/Carousels/ExpertiseCarousel";
import SolutionsSection from "../../components/Home/Carousels/SolutionsSection";
import ProjectPhases from "../../components/Home/ProjectPhases/ProjectPhases";
import Technology from "../../components/Home/Technology/Technology";
import HostingSection from "../../components/Home/Carousels/HostingSection";
import PricingPlans from "../../components/Home/PricingPlans/PricingPlans";
import SpecialSolutions from "../../components/Home/Carousels/SpecialSolution";
import ReadySolutions from "../../components/Home/ReadySolutions/ReadySolutions";
import ProjectsCarousel from "../../components/Home/Carousels/ProjectsCarousel";
import {PROJECTS} from "../../app/data/Projects"

const HEADER_OFFSET = 80;


function scrollHashIntoView(hash: string) {
  const id = (hash || "").replace("#", "");
  if (!id) return;
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  });
}

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scrollHashIntoView(location.hash);
    }
  }, [location.key, location.hash]);

  return (
    <main className="bg-[#010C15]">
      <Hero />
      <About />
      <ServicesCarousel />
      <Features />
      <Brands />
      <ExpertiseCarousel />
      <SolutionsSection />
      <ProjectPhases className="mt-20 md:mt-52" />
      <Technology/>
      <HostingSection/>
      <PricingPlans/>
      <SpecialSolutions/>
      <ReadySolutions/>  
      <ProjectsCarousel projects={PROJECTS}/>
    </main>
  );
}
