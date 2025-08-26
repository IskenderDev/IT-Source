// components/ProjectsCarousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../ui";
import type { Project } from "../../../app/data/Projects";

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

  // ESC + блок скролла body в модалке
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modal]);

  return (
    <section className={`w-full py-8 md:py-12 ${className}`}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <h2
          className="
            mx-auto mb-8 inline-flex items-center justify-center
            rounded-full px-6 md:px-10 py-2
            font-mono text-sm md:text-lg text-white/90
            ring-1 ring-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,.12)]
            bg-[linear-gradient(180deg,rgba(15,61,57,.65),rgba(9,34,39,.65))]
            backdrop-blur-[2px]
          "
        >
          {badgeLabel}
        </h2>

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
                    {/* ВСЕГДА открываем модалку */}
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

      {/* ---------- Модалка (в стиле макета Sky Park) ---------- */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModal(null)}
          />
          <div
            className="
              relative z-10 w-full max-w-[1200px]
              overflow-hidden rounded-2xl border border-white/10
              bg-[#0B1E2F]
            "
          >
            {/* Верхняя двухколоночная зона: слева текст, справа — фото */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-5 md:p-8">
              {/* Левая часть */}
              <div className="lg:col-span-7">
                {/* Большой заголовок модалки */}
                <h3
                  id="project-modal-title"
                  className="font-mono text-white text-2xl md:text-3xl lg:text-[32px] font-semibold leading-tight"
                >
                  {modal.details.heading}
                </h3>

                {/* Короткий подзаголовок/описание под заголовком (из карточки) */}
                <p className="mt-3 text-white/80 text-sm md:text-base">
                  {modal.subtitle}
                </p>

                {/* Карточки: задача / вызовы / результат — как в макете */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Задача */}
                  <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4">
                    <div className="text-white font-semibold mb-2">
                      {modal.details.blocks.task.title}
                    </div>
                    <div className="text-white/85 text-sm leading-relaxed">
                      {modal.details.blocks.task.text}
                    </div>
                  </div>

                  {/* Ключевые вызовы */}
                  {modal.details.blocks.challenges && (
                    <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4">
                      <div className="text-white font-semibold mb-2">
                        {modal.details.blocks.challenges.title}
                      </div>
                      <ul className="text-white/85 text-sm leading-relaxed list-disc pl-5 space-y-1">
                        {modal.details.blocks.challenges.items.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Результат — на всю ширину на sm, справа на lg */}
                  <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4 sm:col-span-2 lg:col-span-1">
                    <div className="text-white font-semibold mb-2">
                      {modal.details.blocks.result.title}
                    </div>
                    <div className="text-white/85 text-sm leading-relaxed">
                      {modal.details.blocks.result.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая часть: фото (как на макете) */}
              <div className="lg:col-span-5">
                {(modal.details.heroImage || modal.modalImage || modal.image) && (
                  <div className="relative overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={modal.details.heroImage || modal.modalImage || modal.image}
                      alt={modal.title}
                      className="w-full h-full max-h-[360px] object-cover"
                    />
                  </div>
                )}
                {/* Лого под фото, если есть */}
                {modal.details.logo && (
                  <div className="mt-4">
                    <img
                      src={modal.details.logo}
                      alt="Логотип"
                      className="h-10 md:h-12 object-contain opacity-90"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Низ: Реализованные решения (полоса в два столбца) */}
            {modal.details.solutions?.length > 0 && (
              <div className="px-5 md:px-8 pb-6 md:pb-8">
                <div className="text-white text-xl font-semibold mb-3">
                  Реализованные решения
                </div>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {modal.details.solutions.map((group, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
                    >
                      <div className="text-white font-semibold mb-2">
                        {group.title}
                      </div>
                      <ul className="text-white/85 text-sm leading-relaxed list-disc pl-5 space-y-1">
                        {group.items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

               
              </div>
            )}

            {/* Крестик */}
            <button
              onClick={() => setModal(null)}
              aria-label="Закрыть"
              className="
                absolute right-3 top-3 md:right-4 md:top-4
                rounded-xl bg-black/55 hover:bg-black/70
                text-white px-3 py-2
              "
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
