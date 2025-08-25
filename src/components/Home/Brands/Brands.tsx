import brands1_d from "/brands/Brands1_d.svg";
import brands2_d from "/brands/Brands2_d.svg";
import brands1_m from "/brands/Brands1_m.svg";
import brands2_m from "/brands/Brands2_m.svg";

const desktopUrls = [brands1_d, brands2_d];
const mobileUrls  = [brands1_m, brands2_m];

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
        {desktopUrls.map((src, i) => (
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
          {mobileUrls.map((src, i) => (
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
