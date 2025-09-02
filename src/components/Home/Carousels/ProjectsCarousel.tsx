import { useEffect, useMemo, useRef, useState } from "react";
import { Button, SectionTitle } from "../../ui";
import type { Project } from "../../../app/data/Projects";
import ProjectModal from "../../ui/ProjectModal/ProjectModal";

export type ProjectsCarouselProps = {
  projects: Project[];
  badgeLabel?: string;
  className?: string;
  autoplay?: boolean;
  autoplayDelayMs?: number;
};

export default function ProjectsCarousel({
  projects,
  badgeLabel = "Проекты примеры внедрений",
  className = "",
  autoplay = true,
  autoplayDelayMs = 4000,
}: ProjectsCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [perView, setPerView] = useState<number>(2);
  const [page, setPage] = useState<number>(0);
  const [modal, setModal] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const pages = useMemo(
    () => Math.max(1, Math.ceil(projects.length / perView)),
    [projects.length, perView]
  );

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setPerView(window.matchMedia("(min-width: 768px)").matches ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => setPage(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (isPaused) return;
      const el = trackRef.current;
      if (!el) return;
      const nextPage = page + 1 >= pages ? 0 : page + 1;
      el.scrollTo({ left: nextPage * el.clientWidth, behavior: "smooth" });
    }, autoplayDelayMs);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayDelayMs, page, pages, isPaused]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("focusin", onEnter);
    wrap.addEventListener("focusout", onLeave);
    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("focusin", onEnter);
      wrap.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <SectionTitle heading={badgeLabel} className="mb-8" />

        <div ref={wrapRef} aria-roledescription="carousel" aria-label="Проекты">
          <div
            ref={trackRef}
            data-hide-scrollbar
            className="
              relative flex gap-4 md:gap-6
              overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              [-ms-overflow-style:none] [scrollbar-width:none]
              focus:outline-none
            "
            role="group"
            aria-live="polite"
          >
            <style>{`[data-hide-scrollbar]::-webkit-scrollbar{display:none}`}</style>

            {projects.map((p) => (
              <article
                key={p.id}
                className="
                  shrink-0 snap-start
                  w-[92%] sm:w-[80%] md:w-[calc(50%-12px)]
                  overflow-hidden rounded-2xl border border-white/10
                  bg-[#0F2738]
                  shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_10px_35px_rgba(0,0,0,0.35)]
                "
              >
                <button
                  type="button"
                  onClick={() => setModal(p)}
                  className="relative block w-full text-left focus:outline-none"
                  aria-label={`Открыть кейс: ${p.title}`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </button>

                <div className="px-5 md:px-6 pt-4 md:pt-5 pb-6 md:pb-8">
                  <h3 className="font-mono text-white text-xl md:text-2xl font-semibold tracking-wide">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-white/85 text-[15px] md:text-base leading-snug">
                    {p.subtitle}
                  </p>

                  <div className="mt-5">
                    <Button fullWidth onClick={() => setModal(p)}>
                      Подробнее
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </section>
  );
}
