import { TECHNOLOGY_DESKTOP, TECHNOLOGY_MOBILE } from "../../../app/data/technology";

export default function Technology() {
  return (
    <section className="w-full py-10 md:py-14 mt-36 font-sans">
    <div className="px-4 md:px-8 mb-5">
        <h2 className="text-center text-white text-sm md:text-2xl">
          Мы используем новейшее оборудование от:
        </h2>
      </div>

      <div className="hidden sm:block">
        {TECHNOLOGY_DESKTOP.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`brands-desktop-${i + 1}`}
            loading="lazy"
            className="w-full h-auto block"
            sizes="100vw"
          />
        ))}
      </div>

      <div className="sm:hidden">
        <div className="mx-4 rounded-2xl px-3 py-4">
          {TECHNOLOGY_MOBILE.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`brands-mobile-${i + 1}`}
              loading="lazy"
              className="w-full h-auto block"
              sizes="100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
