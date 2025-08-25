import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Home/Hero/Hero";
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

const HEADER_OFFSET = 80;
const PROJECTS: any = [
  {
    id: "binteq",
    title: "Binteq group",
    subtitle: "Комплексная инфраструктура для очистных сооружений",
    image: "/projects/binteq.png",
    modalImage: "/projects/binteq-large.png",
    cta: { label: "Подробнее", href: "/cases/binteq" },
    location: "г. Бишкек",
  },
  {
    id: "aplus",
    title: "Бизнес-Центр «А-Плюс»",
    subtitle: "Проектирование и реализация полной цифровой инфраструктуры",
    image: "/projects/a-plus.png",
    cta: { label: "Подробнее", href: "/cases/a-plus" },
    location: "г. Бишкек",
  },
  {
    id: "abc",
    title: "Частная школа ABC",
    subtitle: "Безопасная образовательная среда частной школы «ABC»",
    image: "/projects/abc-school.png",
    cta: { label: "Подробнее", href: "/cases/abc" },
  },
  {
    id: "liverpool",
    title: "Бизнес-Центр «Ливерпуль»",
    subtitle: "Комплексная безопасность бизнес-центра «Ливерпуль»",
    image: "/projects/liverpool-bc.png",
    cta: { label: "Подробнее", href: "/cases/liverpool" },
  },
  {
    id: "crocus",
    title: "Crocus Fitness",
    subtitle: "Технологическая инфраструктура премиального фитнес-клуба",
    image: "/projects/crocus-fitness.png",
  },
  {
    id: "skypark",
    title: "«Sky park-Байтик»",
    subtitle: "Технологические системы для парка развлечений",
    image: "/projects/skypark-baytik.png",
  },
  {
    id: "tezjol",
    title: "Дорога «Тез-Жол»",
    subtitle: "Технологическая инфраструктура платной дороги",
    image: "/projects/tez-jol.png",
  },
  {
    id: "cement",
    title: "Цементный завод «Терек Таш»",
    subtitle:
      "Проектирование и реализация проекта по внедрению систем безопасности и контроля доступа",
    image: "/projects/terek-tash.png",
  },
];

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
