import { FaShieldAlt, FaDesktop, FaLanguage, FaChartBar, FaPuzzlePiece, FaHeadset, FaBolt, FaGlobe, FaLaptop } from "react-icons/fa";

const benefits = [
  {
    icon: FaShieldAlt,
    color: "#03CEA4",
    title: "Безопасный удалённый доступ",
    text: "Обеспечивает безопасные и зашифрованные соединения с приложениями 1C:Enterprise, обеспечивая конфиденциальность и защиту пользовательских данных.",
  },
  {
    icon: FaDesktop,
    color: "#FFD700",
    title: "Удобный интерфейс",
    text: "Интуитивно понятный и удобный интерфейс облегчает пользователям удалённый доступ и работу с приложениями 1C:Enterprise.",
  },
  {
    icon: FaLanguage,
    color: "#FF6A00",
    title: "Поддержка нескольких языков",
    text: "Поддерживает несколько языков, облегчая пользователям по всему миру доступ и работу с приложениями 1C:Enterprise на выбранном ими языке.",
  },
  {
    icon: FaChartBar,
    color: "#03CEA4",
    title: "Масштабируемость",
    text: "Масштабируемая архитектура, которая может быть настроена для потребностей бизнеса любого размера, от небольших стартапов до крупных предприятий.",
  },
  {
    icon: FaPuzzlePiece,
    color: "#FFD700",
    title: "Интеграция с ПО 1C:Enterprise",
    text: "Бесшовная интеграция с существующим ПО 1C:Enterprise, позволяющая пользователям получать доступ к известным приложениям и данным из удалённых мест.",
  },
  {
    icon: FaHeadset,
    color: "#FF6A00",
    title: "Техническая поддержка",
    text: "Доступ к технической поддержке и ресурсам, включая FAQ, базу знаний и контакты для поддержки, для обеспечения плавного и бесперебойного использования.",
  },
  {
    icon: FaBolt,
    color: "#03CEA4",
    title: "Быстрые и безопасные соединения",
    text: "Обеспечивает быстрое и надёжное подключение к приложениям 1C:Enterprise, что позволяет пользователям легко работать удалённо.",
  },
  {
    icon: FaGlobe,
    color: "#FFD700",
    title: "Совместимость с браузерами",
    text: "Поддерживает Google Chrome, Mozilla Firefox и Microsoft Edge для беспрепятственного доступа к приложениям 1C:Enterprise.",
  },
  {
    icon: FaLaptop,
    color: "#FF6A00",
    title: "Кросс-платформенная совместимость",
    text: "Поддерживает Windows, macOS и Linux для доступа к приложениям 1C:Enterprise с разных устройств и платформ.",
  },
];

const Advantages = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#010C28] text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Какие преимущества у 1C RDP?</h2>
        <p className="mt-4 text-gray-400 text-base md:text-lg">
          Сервис 1C:RDP предлагает ряд возможностей для обеспечения безопасного и эффективного удалённого доступа к приложениям 1C:Enterprise.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, color, title, text }) => (
            <div key={title} className="p-6 rounded-xl bg-[#0A1A37] bg-opacity-50 h-full flex flex-col">
              <Icon size={40} color={color} />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-gray-300 text-sm leading-relaxed line-clamp-3">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;

