import type { JSX } from "react";
import {
  FaLock,
  FaLaptop,
  FaRegClone,
  FaProjectDiagram,
  FaPlug,
  FaHeadset,
  FaBolt,
} from "react-icons/fa";
import { MdSecurity, MdDevices } from "react-icons/md";

type Benefit = {
  title: string;
  text: string;
  icon: JSX.Element;
  color: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "Безопасный удалённый доступ",
    text: "Обеспечивает безопасное подключение сотрудников к корпоративной системе из любой точки мира с использованием защищённых каналов и авторизации.",
    icon: <FaLock />,
    color: "#03CEA4",
  },
  {
    title: "Удобный интерфейс",
    text: "Интуитивно понятный и удобный интерфейс для пользователей, что облегчает работу с системой 1С:Enterprise.",
    icon: <FaLaptop />,
    color: "#4DA3FF",
  },
  {
    title: "Поддержка нескольких окон",
    text: "Позволяет работать одновременно с несколькими окнами 1С:Enterprise, повышая удобство и эффективность работы.",
    icon: <FaRegClone />,
    color: "#FF4D4D",
  },
  {
    title: "Масштабируемость",
    text: "Масштабируемая архитектура, которая позволяет добавлять новых пользователей и увеличивать ресурсы по мере роста компании без серьёзных затрат.",
    icon: <FaProjectDiagram />,
    color: "#6A5ACD",
  },
  {
    title: "Интеграция с ПО 1С:Enterprise",
    text: "Полная совместимость и интеграция с различными конфигурациями 1С:Enterprise, что гарантирует корректную работу всех функций.",
    icon: <FaPlug />,
    color: "#03CEA4",
  },
  {
    title: "Техническая поддержка",
    text: "Квалифицированная техническая поддержка, которая помогает оперативно решать возникающие проблемы и консультировать пользователей.",
    icon: <FaHeadset />,
    color: "#FF66CC",
  },
  {
    title: "Быстрые и безопасные соединения",
    text: "Обеспечивает стабильное подключение с минимальной задержкой и высоким уровнем безопасности.",
    icon: <FaBolt />,
    color: "#FFD93D",
  },
  {
    title: "Совместимость с оборудованием",
    text: "Поддержка работы на различных устройствах и периферийном оборудовании, что делает систему универсальной.",
    icon: <MdSecurity />,
    color: "#4DFF91",
  },
  {
    title: "Кросс-платформенная совместимость",
    text: "Возможность работы на разных операционных системах и устройствах — Windows, macOS, Linux и мобильных платформах.",
    icon: <MdDevices />,
    color: "#03CEA4",
  },
];

export default function TariffsBenefits() {
  return (
    <section className="bg-[#010B14] py-20 px-6 text-white">
      <div className="px-5 md:px-16 mx-auto">
        <h2 className="text-3xl text-center md:text-4xl font-bold mb-4">
          Какие преимущества у 1C RDP?
        </h2>
        <p className="text-white text-center max-w-2xl mx-auto mb-16">
          Сервис 1C RDP предлагает ряд возможностей для
          обеспечения безопасного и эффективного удалённого
          доступа к приложениям 1С:Enterprise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-30">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="relative flex flex-col items-start gap-3"
            >
              <div
                className="absolute z-10 w-32 h-32 rounded-full blur-[100px] opacity-60 transition-all duration-300"
                style={{
                  background: b.color,
                  top: i % 2 === 0 ? "-30px" : "auto",
                  bottom: i % 2 !== 0 ? "-30px" : "auto",
                  left: "-20px",
                }}
              />

              <div className="flex items-center gap-3 relative z-10 group">
                <div
                  className="text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color: b.color }}
                >
                  {b.icon}
                </div>
                <h3 className="font-semibold text-lg">{b.title}</h3>
              </div>

              <p className="text-white/70 ml-9 relative z-10 text-sm leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
