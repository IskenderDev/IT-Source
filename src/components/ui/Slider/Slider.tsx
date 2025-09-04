import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button, SectionTitle } from "../../ui";

export type Slide = {
  title: string;
  text: string;
  image: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tertiary?: { label: string; href: string };
  imageAlt?: string;
  background?: string;
  imgMaxHMobile?: number;
  imgMaxHDesktop?: number;
  imgRightPx?: number;
};

type Props = {
  slides: Slide[];
  heading: string;
  subheading?: string;
  checklistDescription?: string;
  options?: EmblaOptionsType;
  autoplay?: boolean;
  autoplayDelayMs?: number;
  className?: string;
  showGlow?: boolean;
  glowColor?: string;
  glowSize?: number;
  mobileImageTop?: boolean;
  mobileSlideMinH?: number;

  imageMaxHMobile?: number;
  imageMaxHDesktop?: number;
  imageRightPx?: number;
};

export default function Slider({
  slides,
  heading,
  subheading,
  checklistDescription,
  options,
  autoplay = true,
  autoplayDelayMs = 5000,
  className = "",
  showGlow = false,
  glowColor = "#FFEE53",
  glowSize = 200,
  mobileImageTop = true,
  mobileSlideMinH = 560,
  imageMaxHMobile = 192,
  imageMaxHDesktop = 480,
  imageRightPx = 112,
}: Props) {
  const emblaPlugins = useMemo(
    () =>
      autoplay ? [Autoplay({ delay: autoplayDelayMs, stopOnInteraction: false })] : [],
    [autoplay, autoplayDelayMs]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", ...options },
    emblaPlugins
  );

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

  // helpers
  const isPdf = (href?: string) => !!href && /\.pdf(\?|#|$)/i.test(href);
  const hasChecklist = (s: Slide) =>
    (!!s.secondary && isPdf(s.secondary.href)) ||
    (!!s.tertiary && isPdf(s.tertiary.href));

  return (
    <section className={`relative w-full font-sans p-4 ${className}`}>
      <div className="mb-12 md:mb-16 relative">
        <SectionTitle heading={heading} subheading={subheading} />

        {showGlow && (
          <div
            className="pointer-events-none hidden md:block absolute rounded-full"
            style={{
              width: glowSize,
              height: glowSize,
              right: -glowSize * 0.25,
              top: 100,
              zIndex: 0,
              background: glowColor,
              opacity: 0.35,
              filter: "blur(128px)",
            }}
          />
        )}
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-5 lg:gap-6">
          {slides.map((s, i) => {
            const mMax = s.imgMaxHMobile ?? imageMaxHMobile;
            const dMax = s.imgMaxHDesktop ?? imageMaxHDesktop;
            const dRight = s.imgRightPx ?? imageRightPx;

            return (
              <div key={i} className="flex-[0_0_100%]">
                <article
                  className="
                    relative w-full
                    min-h-[var(--mh)] md:min-h-0
                    h-auto md:h-[520px] lg:h-[560px]
                    rounded-[24px] md:rounded-[28px]
                    p-4 md:p-8 lg:p-9 text-white
                    shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                    overflow-hidden
                    flex flex-col
                  "
                  style={{
                    ['--mh' as string]: `${mobileSlideMinH}px`,
                    background:
                      s.background ??
                      'linear-gradient(280.68deg, #054277 1.65%, #01192A 97.64%)',
                  }}
                >
                  {/* MOBILE */}
                  <div className="md:hidden mt-auto font-mono text-center">
                    {mobileImageTop && s.image && (
                      <div className="mb-3 flex justify-center">
                        <img
                          src={s.image}
                          alt={s.imageAlt ?? ""}
                          loading="lazy"
                          style={{ maxHeight: `${mMax}px` }}
                          className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                        />
                      </div>
                    )}

                    <h3 className="text-[24px] sm:text-[28px] font-bold leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-white/90 whitespace-pre-line">
                      {s.text}
                    </p>

                    {i === 0 && checklistDescription && hasChecklist(s) && (
                      <p
                        className={`mt-4 text-[14px] sm:text-[15px] font-semibold text-white/95`}
                      >
                        {checklistDescription}
                      </p>
                    )}

                    {(s.primary || s.secondary || s.tertiary) && (
                      <div className="mt-4 flex flex-wrap gap-3 justify-center">
                        {s.primary && (
                          <a href={s.primary.href}>
                            <Button size="lg">{s.primary.label}</Button>
                          </a>
                        )}
                        {s.secondary && (
                          <a
                            href={s.secondary.href}
                            {...(isPdf(s.secondary.href) ? { download: true } : {})}
                          >
                            <Button size="lg" variant="outline">
                              {s.secondary.label}
                            </Button>
                          </a>
                        )}
                        {s.tertiary && (
                          <a
                            href={s.tertiary.href}
                            {...(isPdf(s.tertiary.href) ? { download: true } : {})}
                          >
                            <Button size="lg" variant="outline">
                              {s.tertiary.label}
                            </Button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* DESKTOP */}
                  <div className="hidden md:grid h-full relative grid-cols-[1.2fr_0.8fr] gap-4 lg:gap-6 items-center">
                    <div className="ml-0 md:ml-28 font-mono">
                      <h3 className="text-[32px] lg:text-[40px] font-bold leading-snug">
                        {s.title}
                      </h3>
                      <p className="mt-6 text-[16px] leading-relaxed text-white/90 whitespace-pre-line">
                        {s.text}
                      </p>

                      {i === 0 && checklistDescription && hasChecklist(s) && (
                        <p
                          className={`mt-5 text-[16px] font-semibold text-white`}
                        >
                          {checklistDescription}
                        </p>
                      )}

                      {(s.primary || s.secondary || s.tertiary) && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {s.primary && (
                            <a href={s.primary.href}>
                              <Button size="lg">{s.primary.label}</Button>
                            </a>
                          )}
                          {s.secondary && (
                            <a
                              href={s.secondary.href}
                              {...(isPdf(s.secondary.href) ? { download: true } : {})}
                            >
                              <Button size="lg" variant="outline">
                                {s.secondary.label}
                              </Button>
                            </a>
                          )}
                          {s.tertiary && (
                            <a
                              href={s.tertiary.href}
                              {...(isPdf(s.tertiary.href) ? { download: true } : {})}
                            >
                              <Button size="lg" variant="outline">
                                {s.tertiary.label}
                              </Button>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {s.image && (
                      <div className="h-full relative">
                        <img
                          src={s.image}
                          alt={s.imageAlt ?? ""}
                          loading="lazy"
                          style={{
                            maxHeight: `${dMax}px`,
                            right: `${dRight}px`,
                            top: "50%",
                          }}
                          className="
                            absolute -translate-y-1/2
                            object-contain
                            drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                          "
                        />
                      </div>
                    )}
                  </div>

                  {/* arrows */}
                  <button
                    onClick={() => emblaApi?.scrollPrev()}
                    aria-label="Предыдущий слайд"
                    className="
                      hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
                      h-11 w-11 rounded-full bg-white text-[#03CEA4]
                      items-center justify-center hover:bg-white/90 active:scale-95 transition
                    "
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={() => emblaApi?.scrollNext()}
                    aria-label="Следующий слайд"
                    className="
                      hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
                      h-11 w-11 rounded-full bg-white text-[#03CEA4]
                      items-center justify-center hover:bg-white/90 active:scale-95 transition
                    "
                  >
                    <ChevronRight />
                  </button>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 hidden md:flex w-full items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Перейти к слайду ${i + 1}`}
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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
