import type { JSX } from "react";
import { FaChartLine, FaUserFriends, FaExpandAlt } from "react-icons/fa";
import { MdSecurity, MdDevicesOther, MdPhoneIphone } from "react-icons/md";

type Benefit = {
  title: string;
  text: string;
  icon: JSX.Element;
  color: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "Эффективность",
    text:
      "С помощью 1C RDP пользователи могут получать доступ к своим приложениям и данным из любого места, в любое время и с любого устройства, сокращая время и усилия, необходимые для управления и доступа к данным.",
    icon: <FaChartLine />,
    color: "#03CEA4",
  },
  {
    title: "Коллаборация",
    text:
      "1C RDP упрощает совместную работу независимо от местоположения, позволяя нескольким пользователям одновременно получать доступ к одним и тем же данным и работать над ними.",
    icon: <FaUserFriends />,
    color: "#4DA3FF",
  },
  {
    title: "Мобильность",
    text:
      "1C RDP позволяет пользователям работать из любого места и с любого устройства, при этом приложения и данные доступны в любое время. Это повышает мобильность и продуктивность.",
    icon: <MdPhoneIphone />,
    color: "#FF6AD5",
  },
  {
    title: "Масштабируемость",
    text:
      "1C RDP можно масштабировать по мере необходимости, что позволяет легко приспосабливать систему к изменяющимся потребностям и загрузкам пользователей.",
    icon: <FaExpandAlt />,
    color: "#6A5ACD",
  },
  {
    title: "Безопасность",
    text:
      "1C RDP использует ряд мер безопасности, таких как шифрование передачи данных, многофакторная аутентификация и регулярное обновление/резервное копирование, обеспечивая защиту и конфиденциальность пользовательских данных.",
    icon: <MdSecurity />,
    color: "#03CEA4",
  },
  {
    title: "Совместимость",
    text:
      "Работает на различных операционных системах и устройствах, обеспечивая единый пользовательский опыт и гибкость в выборе платформ.",
    icon: <MdDevicesOther />,
    color: "#FFA940",
  },
];

export default function UserBenefits() {
  return (
    <section className="py-20 px-6 text-white">
      <div className="px-5 md:px-16 mx-auto ">
        <h2 className="text-3xl text-center md:text-4xl font-bold mb-4">
          Преимущества для пользователей
        </h2>
        <p className="text-white text-center max-w-2xl mx-auto mb-16">
          1C RDP предлагает ряд преимуществ для своих пользователей, включая:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-30">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className="relative flex flex-col items-start gap-3">
              <div
                className="absolute w-32 h-32 rounded-full blur-[100px] opacity-60 transition-all duration-300"
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
