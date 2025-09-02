import { FaCloud } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import DeploymentComparisonSection from "../DeploymentComparisonSection/DeploymentComparisonSection";

export default function ServerOptions() {
  return (
    <section
      id="server-options"
      className="relative py-20 px-6 bg-gradient-to-b from-[#011627] to-[#000b15]"
    >
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Опции развертывания сервера
        </h2>
        <p className="text-white/70 max-w-3xl mx-auto">
          Существует два основных варианта: развертывание в облаке или локальное
          развертывание. Каждый вариант имеет свои преимущества и недостатки,
          ниже вы можете увидеть сравнение двух опций.
        </p>
      </div>

      <div className="relative mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div
          className="absolute -top-24 -left-32 w-[400px] h-[400px] rounded-full opacity-30 blur-[160px] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #03CEA4 0%, #4DA3FF 100%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-32 w-[400px] h-[400px] rounded-full opacity-30 blur-[160px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #C15CFF 0%, #FF6AD5 70%, #27AE60 100%)",
          }}
        />
        <div className="relative group border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
            <FaCloud className="text-2xl text-[#03CEA4]" />
            <h3 className="text-xl font-bold text-white">
              Облачное развертывание
            </h3>
          </div>
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-semibold text-white">Плюсы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Масштабируемость —</strong> Возможности динамического
                  масштабирования под изменяющиеся потребности.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Доступность —</strong> Удалённый доступ из любого места
                  при наличии интернета.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Рентабельность —</strong> Оплата в основном за фактически
                  используемые ресурсы.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Автоматические обновления —</strong> Обновления
                  устанавливаются поставщиком.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Минусы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Зависимость от интернета —</strong> Нужно стабильное и
                  быстрое подключение.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Вопросы безопасности —</strong> Зависимость от мер
                  поставщика, возможны регуляторные ограничения.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Ограниченная персонализация —</strong> Настройки
                  ограничены возможностями поставщика.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative group border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
            <FaLocationDot className="text-2xl text-[#C15CFF]" />
            <h3 className="text-xl font-bold text-white">
              Локальное развертывание
            </h3>
          </div>
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-semibold text-white">Плюсы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Полный контроль —</strong> Управление оборудованием и ПО,
                  больше возможностей для настройки и безопасности.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Улучшенная производительность —</strong> Высокая скорость
                  и стабильность для критичных приложений.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Повышенная безопасность данных —</strong> Данные остаются
                  внутри компании.
                </span>
              </li>
              <li className="flex gap-3">
                <IoIosCheckmark className="text-[#27AE60] text-2xl shrink-0" />
                <span>
                  <strong>Независимость от интернета —</strong> Сервис работает без
                  подключения.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Минусы</h4>
            <ul className="space-y-3 text-white/75">
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Высокие первоначальные затраты —</strong> Требуются
                  большие инвестиции.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Затраты на обслуживание —</strong> Постоянные расходы на
                  поддержку и обновления.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Ограниченная масштабируемость —</strong> Добавление
                  ресурсов требует времени и закупок.
                </span>
              </li>
              <li className="flex gap-3">
                <HiMiniXMark className="text-[#E74C3C] text-xl shrink-0" />
                <span>
                  <strong>Требуется техническая экспертиза —</strong> Нужны
                  постоянные знания и ИТ-персонал.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <DeploymentComparisonSection/>
    </section>
  );
}
