    import { FaServer, FaCogs, FaShieldAlt, FaHandsHelping } from "react-icons/fa";
    import { MdSettingsSuggest } from "react-icons/md";
    import { HiOutlineSwitchHorizontal } from "react-icons/hi";

    const features = [
    {
        icon: <FaCogs className="text-[#03CEA4] w-6 h-6 " />,
        title: "Эффективные ИТ",
        text: "Услуги предполагают аппаратное и программное обеспечение, обеспечивающее надежное и эффективное выполнение ИТ-операций.",
    },
    {
        icon: <HiOutlineSwitchHorizontal className="text-[#03CEA4] w-6 h-6" />,
        title: "Гибкие варианты",
        text: "Мы предлагаем масштабируемые решения, адаптированные под разные размеры организаций и объемы обработки данных.",
    },
    {
        icon: <MdSettingsSuggest className="text-[#03CEA4] w-6 h-6" />,
        title: "Оптимизированная эффективность",
        text: "Наша команда обеспечивает бесперебойную работу систем и держит под контролем все ИТ-процессы.",
    },
    {
        icon: <FaHandsHelping className="text-[#03CEA4] w-6 h-6" />,
        title: "Индивидуальная поддержка",
        text: "Вы получите круглосуточную экспертную помощь, чтобы ваши серверы и оборудование оставались под надежной поддержкой.",
    },
    {
        icon: <FaShieldAlt className="text-[#03CEA4] w-6 h-6" />,
        title: "Надежно и безопасно",
        text: "Серверное оборудование соответствует мировым стандартам безопасности и надежности, гарантируя защиту данных и процессов клиентов.",
    },
    {
        icon: <FaServer className="text-[#03CEA4] w-6 h-6" />,
        title: "Надежное оборудование",
        text: "Партнерство с ведущими брендами: Microsoft, HP, DELL, CISCO и Mikrotik.",
    },
    ];

    export default function ServerEquipment() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 text-white bg-[#010B14]">
        <div className="text-center mx-auto max-w-2xl">
            <h2 className="text-4xl font-mono font-bold ">
            Что такое серверное оборудование?
            </h2>
            <p className="mt-4  text-xl  font-sans">
            Благодаря партнерству с ведущими брендами, такими как Microsoft, HP,
            DELL, CISCO и Mikrotik, мы можем предложить высококачественное
            серверное оборудование для предприятий любого размера.
            </p>
        </div>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 mt-10 gap-12 items-center">
            <div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((f) => (
                    <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{f.title}</h3>
                      <p className="text-sm text-white/70">{f.text}</p>
                    </div>
                  </div>
                ))}
                </div>
            </div>

            <div className="relative">
                <img
                src="/assets/server-equipment.png"
                alt="Серверное оборудование"
                className="w-full"
                />
            </div>
            </div>
        </section>
    );
    }
