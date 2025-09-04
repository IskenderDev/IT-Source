import { TECHNOLOGY_DESKTOP } from "../../../app/data/technology";

export default function Technology() {
  return (
    <section className="w-full py-20 mt-36 font-sans overflow-hidden">
      <div className="px-4 md:px-8 mb-5">
        <h2 className="text-center text-white text-sm md:text-2xl">
          Мы используем новейшее оборудование от:
        </h2>
      </div>

      <div>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-left">
            {[...TECHNOLOGY_DESKTOP, ...TECHNOLOGY_DESKTOP].map((src, i) => (
              <>
                <img
                  key={`tech-desk-${i}`}
                  src={src}
                  alt={`tech-desktop-${i}`}
                  loading="lazy"
                  className="h-28 md:h-full w-auto mx-8"
                />
                <img
                key={`tech-desk-${i}`}
                src={src}
                alt={`tech-desktop-${i}`}
                loading="lazy"
                className="h-28 md:h-full w-auto mx-8"
              />
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
