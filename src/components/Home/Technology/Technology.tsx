import brands3_d from "/brands/Brands3_d.svg";
import brands3_m from "/brands/Brands3_m.svg";
import { SectionTitle } from "../../ui";

const desktopUrls = [brands3_d];
const mobileUrls = [brands3_m];

export default function Technology() {
  return (
    <section className="w-full py-10 md:py-14 mt-36 font-sans">
      <SectionTitle
        heading="Мы используем новейшее оборудование от:"
        className="px-4 md:px-8 mb-5"
      />

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
