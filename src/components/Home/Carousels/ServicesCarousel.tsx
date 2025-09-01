import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button, SectionTitle } from "../../ui";

const slides = [
  {
    image: "/slides/exp.png",
    title: "Экспертиза",
    subtitle: "Аудит, консалтинг, анализ инфраструктуры",
    cta: { label: "Подробнее", href: "/services/expertise" },
    ghost: { label: "Скачать чек-лист", href: "/files/checklist.pdf" },
  },
  {
    image: "/slides/design.png",
    title: "Проектирование под ключ",
    subtitle: "Сетевые, серверные и слаботочные решения",
    cta: { label: "Подробнее", href: "/services/design" },
  },
  {
    image: "/slides/hosting.png",
    title: "Аренда серверов",
    subtitle: "Готовая IT-инфраструктура в ЦОД без перерывов",
    cta: { label: "Подробнее", href: "/services/servers" },
  },
  {
    image: "/slides/special.png",
    title: "Специальные решения",
    subtitle: "UKEY, IoT, интеграции, автоматизация",
    cta: { label: "Подробнее", href: "/services/special" },
  },
];

const options: EmblaOptionsType = { loop: true, align: "start" };

export default function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className="relative w-full font-sans mt-5">
      <SectionTitle heading="Услуги" className="mb-6" />
      <div className="overflow-hidden rounded-[28px]" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <img
                src={s.image}
                alt={s.title}
                className="h-[480px] md:h-[620px] lg:h-[700px] w-full object-cover rounded-[28px]"
              />

              <div
                className="
                  absolute inset-x-4 bottom-4 z-10
                  md:inset-auto md:left-10 md:right-auto md:bottom-10
                "
              >
                <div
                  className="
                    w-full max-w-[600px]
                    rounded-[20px] md:rounded-[24px] p-4 md:p-8
                   text-black bg-[#FFFFFF99]
                  "
                >
                  <h3 className="text-xl md:text-[40px] leading-tight md:leading-[1.1] font-semibold">
                    {s.title}
                  </h3>

                  {s.subtitle && (
                    <p className="mt-2 text-sm md:text-lg/6 opacity-80">
                      {s.subtitle}
                    </p>
                  )}

                  <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    {s.cta && (
                      <a href={s.cta.href} className="inline-block">
                        <Button size="lg" className="hidden md:inline-flex">
                          {s.cta.label}
                        </Button>
                      </a>
                    )}

                    {s.ghost && (
                      <a href={s.ghost.href} className="inline-block">
                        <Button size="lg" variant="outline" className="hidden md:inline-flex">
                          {s.ghost.label}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Стрелки */}
              <button
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Предыдущий слайд"
                className="
                  hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
                  h-12 w-12 rounded-full bg-emerald-400 text-white
                  items-center justify-center shadow-lg/50
                  hover:scale-105 active:scale-95 transition
                "
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Следующий слайд"
                className="
                  hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
                  h-12 w-12 rounded-full bg-emerald-400 text-white
                  items-center justify-center shadow-lg/50
                  hover:scale-105 active:scale-95 transition
                "
              >
                <ChevronRight />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Индикаторы */}
      <div className="mt-4 hidden md:flex w-full items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Перейти к слайду ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition ${
              selectedIndex === i ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
