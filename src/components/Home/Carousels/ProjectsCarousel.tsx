// components/ProjectsCarousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../ui";

/* ===================== Типы ===================== */
export type CaseSolution = {
  title?: string;
  items: string[];
};

export type CaseBlocks = {
  task: string;
  challenges?: string[];
  result: string;
};

export type CaseDetails = {
  blocks: CaseBlocks;
  solutions: CaseSolution[];
  logo?: string;
  heroImage?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  modalImage?: string;
  cta?: { label: string; href: string };
  location?: string;
  details?: CaseDetails;
};

export type ProjectsCarouselProps = {
  projects: Project[];
  heading?: string;
  className?: string;
  autoplay?: boolean;
  autoplayDelayMs?: number;
};

/* ===================== Компонент ===================== */
export default function ProjectsCarousel({
  projects,
  heading = "Наши проекты",
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

  // Кол-во "страниц"
  const pages = useMemo<number>(
    () => Math.max(1, Math.ceil(projects.length / perView)),
    [projects.length, perView]
  );

  // SSR-safe брейкпоинт: 1 карточка на мобиле, 2 на md+
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setPerView(window.matchMedia("(min-width: 768px)").matches ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Синхронизация индикаторов по скроллу
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const next = Math.round(el.scrollLeft / el.clientWidth);
      setPage(next);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Автопрокрутка
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

  // Пауза при hover/focus
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

  // ESC для модалки + блок скролла body
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

  const scrollToPage = (n: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(n, pages - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const prev = () => scrollToPage(page - 1);
  const next = () => scrollToPage(page + 1);

  return (
    <section className={`w-full py-8 md:py-12 ${className}`}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg md:text-2xl font-semibold text-white/90">
            {heading}
          </h2>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Назад"
              className="rounded-xl bg-white/10 hover:bg-white/20 transition px-3 py-2"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Вперёд"
              className="rounded-xl bg-white/10 hover:bg-white/20 transition px-3 py-2"
            >
              ›
            </button>
          </div>
        </div>

        <div ref={wrapRef} aria-roledescription="carousel" aria-label="Проекты">
          {/* Трек */}
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
            <style>{`
              [data-hide-scrollbar]::-webkit-scrollbar{display:none}
            `}</style>

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
                    {p.details ? (
                      <Button fullWidth onClick={() => setModal(p)}>
                        Подробнее
                      </Button>
                    ) : p.cta ? (
                      <a
                        href={p.cta.href}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button fullWidth>{p.cta.label}</Button>
                      </a>
                    ) : (
                      <Button fullWidth onClick={() => setModal(p)}>
                        Подробнее
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Точки */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                aria-label={`К слайду ${i + 1}`}
                onClick={() => scrollToPage(i)}
                className={`h-2 rounded-full transition-all ${
                  page === i
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Модалка ---------- */}
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
          <div className="relative z-10 w-full max-w-[1100px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1E2F]">
            {(modal.modalImage || modal.image) && (
              <div className="relative">
                <img
                  src={modal.modalImage || modal.image}
                  alt={modal.title}
                  className="w-full max-h-[48vh] object-cover"
                />
                <button
                  onClick={() => setModal(null)}
                  aria-label="Закрыть"
                  className="absolute right-3 top-3 rounded-xl bg-black/55 hover:bg-black/70 text-white px-3 py-2"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="p-5 md:p-8">
              <h3
                id="project-modal-title"
                className="text-white text-xl md:text-2xl font-semibold font-mono"
              >
                {modal.title}
              </h3>
              {modal.location && (
                <div className="mt-1 text-sm text-white/60">
                  Локация: {modal.location}
                </div>
              )}
              <p className="mt-3 text-white/85">{modal.subtitle}</p>

              {!!modal.details && (
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Задача */}
                  <div className="rounded-xl bg-white/[0.06] p-4 md:p-5 border border-white/10">
                    <div className="font-semibold text-white text-lg mb-2">
                      Задача
                    </div>
                    <div className="text-white/85 text-sm leading-relaxed">
                      {modal.details.blocks.task}
                    </div>
                  </div>

                  {/* Ключевые вызовы (если есть) */}
                  {Array.isArray(modal.details.blocks.challenges) &&
                    modal.details.blocks.challenges.length > 0 && (
                      <div className="rounded-xl bg-white/[0.06] p-4 md:p-5 border border-white/10">
                        <div className="font-semibold text-white text-lg mb-2">
                          Ключевые вызовы
                        </div>
                        <ul className="text-white/85 text-sm leading-relaxed list-disc pl-5 space-y-1">
                          {modal.details.blocks.challenges.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Результат */}
                  <div className="rounded-xl bg-white/[0.06] p-4 md:p-5 border border-white/10 lg:col-span-1">
                    <div className="font-semibold text-white text-lg mb-2">
                      Результат
                    </div>
                    <div className="text-white/85 text-sm leading-relaxed">
                      {modal.details.blocks.result}
                    </div>
                  </div>

                  {/* Реализованные решения */}
                  <div className="lg:col-span-3 mt-2">
                    <div className="text-white text-xl font-semibold mb-3">
                      Реализованные решения
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      {modal.details.solutions.map((group, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-white/[0.04] p-4 md:p-5 border border-white/10"
                        >
                          {group.title && (
                            <div className="text-white font-semibold mb-2">
                              {group.title}
                            </div>
                          )}
                          <ul className="text-white/85 text-sm leading-relaxed space-y-1 list-disc pl-5">
                            {group.items.map((it, i) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                {modal.cta && (
                  <a href={modal.cta.href}>
                    <Button className="!rounded-full !text-white !font-semibold !bg-transparent btn-gradient-green">
                      {modal.cta.label}
                    </Button>
                  </a>
                )}
                <Button onClick={() => setModal(null)}>
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Локальный утилити-класс под зелёный градиент кнопки */}
      <style>{`
        .btn-gradient-green {
          background-image: linear-gradient(90deg, #2DD4BF 0%, #22C55E 100%);
          box-shadow: inset 0 -1px 0 rgba(255,255,255,.15);
          padding: 12px 20px;
        }
      `}</style>
    </section>
  );
}
