import { BRANDS_DESKTOP, BRANDS_MOBILE } from "../../../app/data/brands";

export default function Brands() {
  return (
    <section className="w-full py-10 md:py-14 mt-36 font-sans">
     <div className="px-4 md:px-8">
        <h2 className="text-center text-[#F1F1F1] text-sm md:text-base">
          Мы помогли более 100+ компаниям
        </h2>
        <div className="mx-auto mt-4 mb-8 h-px w-full max-w-[900px] bg-white" />
      </div>

      <div className="hidden sm:block">
        {BRANDS_DESKTOP.map((src, i) => (
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
          {BRANDS_MOBILE.map((src, i) => (
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
