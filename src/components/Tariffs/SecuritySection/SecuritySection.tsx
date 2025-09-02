// components/Security/SecuritySection.tsx
import type { JSX } from "react";
import { FaLock, FaUserShield, FaShieldAlt, FaDatabase } from "react-icons/fa";
import { MdSystemUpdateAlt } from "react-icons/md";
import UserBenefits from "../UserBenefits/UserBenefits";

type Card = { title: string; text: string; icon: JSX.Element; color: string };

const CARDS: Card[] = [
  {
    title: "Зашифрованная передача данных",
    text: "Передача данных между 1C RDP и пользователями полностью зашифрована, что обеспечивает защиту конфиденциальной информации от несанкционированного доступа.",
    icon: <FaLock aria-hidden="true" />,
    color: "#FF6AD5",
  },
  {
    title: "Многофакторная аутентификация",
    text: "Многофакторная аутентификация используется для проверки личности пользователя при попытках подключения к 1C RDP. Это помогает предотвращать несанкционированный доступ к данным пользователей.",
    icon: <FaUserShield aria-hidden="true" />,
    color: "#03CEA4",
  },
  {
    title: "Регулярное обновление ПО",
    text: "Регулярно выпускаются обновления программного обеспечения для устранения уязвимостей безопасности и повышения общей безопасности 1C RDP.",
    icon: <MdSystemUpdateAlt aria-hidden="true" />,
    color: "#4DA3FF",
  },
  {
    title: "Физическая безопасность",
    text: "Центры обработки данных 1C RDP физически защищены, имеют ограниченный доступ и многоуровневую систему безопасности.",
    icon: <FaShieldAlt aria-hidden="true" />,
    color: "#FF7A6E",
  },
  {
    title: "Резервное копирование и аварийное восстановление",
    text: "Регулярно выполняется резервное копирование данных пользователей, а также разработаны планы аварийного восстановления для обеспечения непрерывности и быстрого восстановления данных пользователей в случае аварии.",
    icon: <FaDatabase aria-hidden="true" />,
    color: "#FFD166",
  },
];

function SecurityCard({ card }: { card: Card }) {
  return (
    <article className="relative w-full h-72 bg-white/5 border border-white/10  p-6 md:p-7   transition-transform duration-300 hover:-translate-y-1">
      <div
        className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-[120px] transition-opacity duration-300"
        style={{ backgroundColor: card.color, opacity: 0.28 }}
      />
        <div className="text-2xl md:text-3xl mb-5" style={{ color: card.color }}>
          {card.icon}
        </div>
      <div className="relative flex gap-3 mb-4">
        <h3 className="text-lg md:text-xl font-semibold">{card.title}</h3>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{card.text}</p>
    </article>
  );
}

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="relative bg-[#010B14] py-20 px-6 md:px-10 font-mono text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto ">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">Безопасность</h2>
        <p className="text-white/70 max-w-3xl mx-auto text-center">
          Безопасность является главным приоритетом для 1C RDP, и для обеспечения
          безопасности и конфиденциальности пользовательских данных был принят ряд
          мер. К таким мерам относятся:
        </p>

        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {CARDS.map((card, i) => {
            const span =
              i < 3 ? "sm:col-span-1 lg:col-span-2" : "sm:col-span-2 lg:col-span-3";
            return (
              <div key={i} className={span}>
                <SecurityCard card={card} />
              </div>
            );
          })}
        </div>
      </div>

      <UserBenefits />
    </section>
  );
}
