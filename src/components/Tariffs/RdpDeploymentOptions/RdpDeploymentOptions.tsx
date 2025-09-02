// components/ServerOptions/RdpDeploymentOptions.tsx
import { HiOutlineCloud } from "react-icons/hi";
import { MdDns } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import OptionsComparisonSection from "../OptionsComparisonSection/OptionsComparisonSection";

export default function RdpDeploymentOptions() {
  return (
    <section
      id="rdp-deployment-options"
      className="relative py-24 px-6 bg-gradient-to-b from-[#011627] to-[#000b15]"
    >
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Опции развертывания 1C RDP
        </h2>
        <p className="text-white/70 max-w-3xl mx-auto">
          Существует два основных варианта: развертывание в облаке или локальное
          развертывание. Каждый вариант имеет свои преимущества и недостатки —
          ниже сравнение двух опций.
        </p>
      </div>

      {/* Карточки */}
      <div className="relative mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Glow слева (облако) */}
        <div
          className="absolute -top-24 -left-32 w-[400px] h-[400px] rounded-full opacity-30 blur-[160px] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #03CEA4 0%, #4DA3FF 100%)",
          }}
        />
        {/* Glow справа (локально) */}
        <div
          className="absolute -bottom-24 -right-32 w-[400px] h-[400px] rounded-full opacity-30 blur-[160px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #C15CFF 0%, #FF6AD5 70%, #27AE60 100%)",
          }}
        />

        {/* ---------- Облачное ---------- */}
        <div className="relative border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-transform duration-300 hover:-translate-y-1">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
            <HiOutlineCloud className="text-2xl text-[#03CEA4]" />
            <h3 className="text-xl font-bold text-white">Облачное развертывание</h3>
          </div>

          {/* Плюсы */}
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-semibold text-white">Плюсы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Меньше первоначальных затрат —</strong> нет необходимости
                  в дорогостоящем оборудовании и ИТ-инфраструктуре.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Масштабируемость —</strong> легко увеличивать ресурсы по
                  мере роста компании и нагрузки.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Доступность —</strong> доступ из любого места при наличии
                  стабильного интернета.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Безопасность —</strong> поставщики облака предоставляют
                  расширенные механизмы защиты, резервирования и мониторинга.
                </span>
              </li>
            </ul>
          </div>

          {/* Минусы */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Минусы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Зависимость от интернета —</strong> требуется стабильное
                  и быстрое подключение; при перебоях работа может нарушаться.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Ограниченные возможности персонализации —</strong> часть
                  настроек определяется политиками провайдера.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Подписка —</strong> регулярные платежи, стоимость зависит
                  от потребляемых ресурсов.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Локальное ---------- */}
        <div className="relative border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-transform duration-300 hover:-translate-y-1">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
            <MdDns className="text-2xl text-[#C15CFF]" />
            <h3 className="text-xl font-bold text-white">Локальное развертывание</h3>
          </div>

          {/* Плюсы */}
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-semibold text-white">Плюсы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Персонализация —</strong> больше возможностей настройки
                  1C RDP под конкретные нужды и требования.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Независимость от интернета —</strong> система может
                  работать в локальной сети без внешнего подключения.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Контроль над данными и безопасностью —</strong> полный
                  контроль над инфраструктурой, политиками и доступами.
                </span>
              </li>
            </ul>
          </div>

          {/* Минусы */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Минусы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Больше первоначальных затрат —</strong> закупка
                  оборудования, лицензий и подготовка площадки.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Обслуживание и поддержка —</strong> регулярные обновления,
                  резервное копирование и сопровождение силами ИТ-персонала.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Технические знания —</strong> требуются специалисты для
                  администрирования и мониторинга систем.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <OptionsComparisonSection/>
    </section>
  );
}
