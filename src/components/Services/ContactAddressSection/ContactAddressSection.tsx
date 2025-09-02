// components/Contact/ContactAddressSection.tsx
import { FaBuilding, FaPhoneAlt, FaAt } from "react-icons/fa";
import type { JSX } from "react";
import ContactForm from "../../Home/ContactForm/ContactForm";

type CardProps = {
  title: string;
  lines: (string | JSX.Element)[];
  Icon: React.ElementType;
  glow: string; // hex
};

function ContactCard({ title, lines, Icon, glow }: CardProps) {
  return (
    <div
      className="group relative bg-[#0e1c29] border border-white/10 h-[270px] p-6 md:p-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -bottom-6 -left-6 w-40 h-40 rounded-full blur-[120px] transition-opacity duration-300"
        style={{ background: glow, opacity: 0.28 }}
      />
      <div
        className="pointer-events-none absolute -bottom-6 -left-6 w-40 h-40 rounded-full blur-[120px] opacity-0 transition-opacity duration-300 group-hover:opacity-30"
        style={{ background: glow }}
      />

      <h3 className="text-white/80 text-sm tracking-wide mb-4">{title}</h3>

      <div className="space-y-1 text-lg md:text-xl">
        {lines.map((l, i) => (
          <div key={i} className="leading-relaxed">{l}</div>
        ))}
      </div>

      <Icon
        className="absolute bottom-6 right-6 text-2xl md:text-3xl opacity-90"
        style={{ color: glow }}
        aria-hidden
      />
    </div>
  );
}

export default function ContactAddressSection() {
  return (
    <section className="relative bg-[#011627] text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Контакты и адрес
          </h2>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto">
            Этот блок предназначен для того, чтобы предоставить вам всю
            необходимую информацию для связи с нами.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ContactCard
            title="Адрес"
            Icon={FaBuilding}
            glow="#4DA3FF"
            lines={["г. Бишкек, ул. Бакаева 140\\3"]}
          />

          <ContactCard
            title="Телефон"
            Icon={FaPhoneAlt}
            glow="#03CEA4"
            lines={[
              <a key="p1" href="tel:+996555800013" className="hover:underline">
                +996 (555) 800 - 013
              </a>,
              <a key="p2" href="tel:+996999800013" className="hover:underline">
                +996 (999) 800-013
              </a>,
            ]}
          />

          <ContactCard
            title="Почта"
            Icon={FaAt}
            glow="#FF4D4D"
            lines={[
              <a key="m1" href="mailto:info@itsource.kg" className="hover:underline">
                info@itsource.kg
              </a>,
              <a key="m2" href="mailto:sales@itsource.kg" className="hover:underline">
                sales@itsource.kg
              </a>,
              <a key="m3" href="mailto:help@itsource.kg" className="hover:underline">
                help@itsource.kg
              </a>,
            ]}
          />
        </div>
      </div>
      <ContactForm/>
    </section>
  );
}
