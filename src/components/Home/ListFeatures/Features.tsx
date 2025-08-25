import { FaStar, FaCogs, FaWrench, FaPhoneAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaStar className="text-3xl md:text-4xl text-[#2b2b2b]" />,
    title: "10+ лет опыта",
    subtitle: "От SMB до enterprise проектов",
  },
  {
    icon: <FaCogs className="text-3xl md:text-4xl text-[#2b2b2b]" />,
    title: "Полный цикл",
    subtitle: "От анализа до внедрения и поддержки",
  },
  {
    icon: <FaWrench className="text-3xl md:text-4xl text-[#2b2b2b]" />,
    title: "Под ключ",
    subtitle: "Все работы силами одной команды",
  },
  {
    icon: <FaPhoneAlt className="text-3xl md:text-4xl text-[#2b2b2b]" />,
    title: "Техподдержка 24/7",
    subtitle: "Проактивный мониторинг и SLA",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-gradient-to-r from-teal-200 to-teal-300 py-10 rounded-2xl text-black mt-28 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            {f.icon}
            <h3 className="text-base md:text-3xl font-semibold">{f.title}</h3>
            <p className="text-xs md:text-sm text-gray-700">{f.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
