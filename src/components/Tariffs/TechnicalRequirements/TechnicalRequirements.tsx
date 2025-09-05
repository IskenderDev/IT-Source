import {
    FaWindows,
    FaChrome,
    FaInternetExplorer,
    FaServer,
  } from "react-icons/fa";
  import { MdDevices } from "react-icons/md";
  import { HiOutlineDesktopComputer } from "react-icons/hi";
  
  const requirements = [
    {
      icon: <MdDevices className="text-[#03CEA4] w-6 h-6" />,
      title: "Операционная система",
      text: "Windows, macOS или Linux",
    },
    {
      icon: <FaChrome className="text-[#03CEA4] w-6 h-6" />,
      title: "Веб-браузер",
      text: "Google Chrome, Mozilla Firefox или Microsoft Edge",
    },
    {
      icon: <FaInternetExplorer className="text-[#03CEA4] w-6 h-6" />,
      title: "Интернет",
      text: "Стабильное и быстрое соединение с пропускной способностью не менее 1 Мбит/с",
    },
    {
      icon: <HiOutlineDesktopComputer className="text-[#03CEA4] w-6 h-6" />,
      title: "Обеспечение",
      text: "Компьютер или устройство с мощностью, достаточной для запуска приложений 1С:Enterprise",
    },
    {
      icon: <FaWindows className="text-[#03CEA4] w-6 h-6" />,
      title: "ПО 1С:Enterprise",
      text: "Действительная лицензия и установленная программа 1С:Enterprise на сервере",
    },
    {
      icon: <FaServer className="text-[#03CEA4] w-6 h-6" />,
      title: "Серверная инфраструктура",
      text: "Виртуальный или физический сервер (VPS/VDS) или облачная хостинговая платформа",
    },
  ];
  
  export default function TechnicalRequirements() {
    return (
      <section className="relative py-20 px-6 md:px-12 lg:px-20 text-white bg-[#010B14]">
        <div className="text-center mx-auto max-w-2xl">
          <h2 className="text-4xl font-mono font-bold">Технические требования</h2>
          <p className="mt-4 text-xl font-sans text-white/80">
            Технические требования к 1С RDP варьируются в зависимости от конкретных
            требований к установке и использованию конкретного внедрения.
          </p>
        </div>
  
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 mt-10 gap-12 items-center">
          <div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {requirements.map((r) => (
                <div key={r.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 flex items-center justify-center">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{r.title}</h3>
                    <p className="text-sm text-white/70">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/rdp-requirements.png`}
              alt="Технические требования"
              className="w-full"
            />
          </div>
        </div>
      </section>
    );
}
  