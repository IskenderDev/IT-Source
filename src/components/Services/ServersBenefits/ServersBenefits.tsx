import type { JSX } from "react";
import {
    FaShieldAlt,
    FaBolt,
    FaExpandArrowsAlt,
    FaLock,
    FaMoneyBillWave,
  } from "react-icons/fa";
  import { HiOutlineSwitchHorizontal } from "react-icons/hi";
  import { MdSettingsSuggest } from "react-icons/md";
  
  type Benefit = {
    title: string;
    text: string;
    icon: JSX.Element;
    color: string;
  };
  
  const BENEFITS: Benefit[] = [
    {
      title: "Надёжность",
      text: "Серверное оборудование предназначено для работы в режиме 24/7, обеспечивая надежное и бесперебойное обслуживание. Благодаря избыточным компонентам и системам резервного копирования серверное оборудование позволяет минимизировать время простоя и обеспечить непрерывность бизнеса.",
      icon: <FaShieldAlt />,
      color: "#03CEA4",
    },
    {
      title: "Повышенная производительность",
      text: "Серверное оборудование обеспечивает более высокий уровень вычислительной мощности и емкости хранения данных по сравнению с традиционными настольными компьютерами, позволяя клиентам работать с более требовательными приложениями и данными.",
      icon: <FaBolt />,
      color: "#FF4D4D",
    },
    {
      title: "Масштабируемость",
      text: "Серверное оборудование можно легко расширять и модернизировать по мере изменения потребностей бизнеса, что позволяет клиентам адаптироваться к новым требованиям и развивать свою деятельность.",
      icon: <FaExpandArrowsAlt />,
      color: "#4DFF91",
    },
    {
      title: "Виртуализация",
      text: "Серверное оборудование поддерживает технологии виртуализации, позволяя клиентам запускать несколько виртуальных машин на одном физическом сервере, сокращая расходы на оборудование и обслуживание.",
      icon: <HiOutlineSwitchHorizontal />,
      color: "#6A5ACD",
    },
    {
      title: "Централизованное управление",
      text: "Серверное оборудование позволяет централизовать ИТ-ресурсы, облегчая управление, мониторинг и обслуживание всех сетевых устройств из одного места.",
      icon: <MdSettingsSuggest />,
      color: "#03CEA4",
    },
    {
      title: "Безопасность",
      text: "Серверное оборудование обеспечивает надежную платформу для конфиденциальных данных, с расширенными функциями безопасности и возможностями резервного копирования для обеспечения защиты данных и аварийного восстановления.",
      icon: <FaLock />,
      color: "#FF4D4D",
    },
    {
      title: "Снижение затрат",
      text: "В долгосрочной перспективе серверное оборудование может быть более экономически эффективным по сравнению с несколькими настольными компьютерами, поскольку оно обеспечивает централизованное управление, снижает энергопотребление и затраты на обслуживание.",
      icon: <FaMoneyBillWave />,
      color: "#FF66CC",
    },
  ];
  
  export default function ServersBenefits() {
    return (
      <section className="bg-[#010B14] py-20 px-6 text-white">
        <div className="px-5 md:px-16 mx-auto ">
          <h2 className="text-3xl text-center md:text-4xl font-bold mb-4">
            Чем хороши серверы?
          </h2>
          <p className="text-white text-center max-w-2xl mx-auto mb-16">
            Существует множество причин, почему стоит использовать серверы. Ниже
            вы можете с ними ознакомиться.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-30">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="relative flex flex-col items-start gap-3"
              >
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
  