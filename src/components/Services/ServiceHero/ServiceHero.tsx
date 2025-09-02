import { Button } from "../../ui";

type ServiceHeroProps = {
  svgSrc?: string;
  image?: React.ReactNode;
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export default function ServiceHero({
  svgSrc = "",
  image,
  title,
  subtitle,
  ctaHref = "#contact",
  ctaLabel = "Связаться с нами",
}: ServiceHeroProps) {
  return (
    <section
      className="relative overflow-hidden
        pt-24 sm:pt-28 md:pt-32 -top-22"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, rgba(1, 11, 20, 0) 100%)",
      }}
    >

      {image ?? (
        <img
          src={svgSrc}
          alt=""
          className="relative z-10 w-full h-auto select-none"
          loading="eager"
        />
      )}

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1
          className="font-mono text-white font-semibold tracking-wide leading-tight
                     text-[28px] sm:text-[34px] md:text-[44px] lg:text-[56px]"
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-white/70 mx-auto max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="mt-8">
          <Button size="lg" >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
