import { BRANDS_DESKTOP } from "../../../app/data/brands";

export default function Brands() {
  return (
    <section className="w-full py-20 mt-36 font-sans overflow-hidden">
      <div className="px-4 md:px-8">
        <h2 className="text-center text-[#F1F1F1] text-sm md:text-base">
          Мы помогли более 100+ компаниям
        </h2>
        <div className="mx-auto mt-4 mb-8 h-px w-full max-w-[900px] bg-white" />
      </div>

      <div className="md:space-y-14 space-y-5">
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-right">
            {[...BRANDS_DESKTOP, ...BRANDS_DESKTOP].map((src, i) => (
              <img
                key={`top-${i}`}
                src={src}
                alt={`brands-desktop-${i}`}
                className="md:h-full h-28 w-auto mx-6"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-left">
            {[...BRANDS_DESKTOP, ...BRANDS_DESKTOP].map((src, i) => (
              <img
                key={`bottom-${i}`}
                src={src}
                alt={`brands-desktop-${i}`}
                className="md:h-full h-28 w-auto mx-6"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
