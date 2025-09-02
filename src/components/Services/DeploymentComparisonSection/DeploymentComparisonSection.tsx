import { IoIosCheckmark } from "react-icons/io";

type Cell = { text: string; check?: boolean };
type Row = { feature: string; cloud: Cell; local: Cell };

const ROWS: Row[] = [
  { feature: "Первоначальные затраты", cloud: { text: "Меньше" }, local: { text: "Больше" } },
  { feature: "Гибкость", cloud: { text: "Больше" }, local: { text: "Меньше" } },
  { feature: "Доступность", cloud: { text: "Высокая", check: true }, local: { text: "Маленькая" } },
  { feature: "Безопасность", cloud: { text: "Высокая", check: true }, local: { text: "Высокая", check: true } },
  { feature: "Опции персонализации", cloud: { text: "Ограниченные" }, local: { text: "Высокие" } },
  { feature: "Зависимость от интернета", cloud: { text: "Есть" }, local: { text: "Нет", check: true } },
  { feature: "Контроль над данными/безопасностью", cloud: { text: "Меньше" }, local: { text: "Больше", check: true } },
];

function CellContent({ cell }: { cell: Cell }) {
  return (
    <div
      tabIndex={0}
      className="inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#4DA3FF]/40 rounded-md px-5"
      aria-label={cell.text}
    >
      <span className="whitespace-normal break-words">{cell.text}</span>
      {cell.check && <IoIosCheckmark className="text-[20px] md:text-[22px] text-[#27AE60]" aria-hidden />}
    </div>
  );
}

export default function DeploymentComparisonSection() {
  return (
    <section
      className="relative isolate py-20 px-4 md:px-8 font-mono text-white"
      aria-label="Сравнение опций развертывания"
    >
      <div className="mx-auto text-center space-y-4 max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-semibold">Детальное сравнение двух опций</h2>
        <p className="text-white/70 md:text-lg">
          В заключение следует отметить, что выбор зависит от конкретных потребностей и требований каждого клиента. Перед
          принятием решения, клиенты должны тщательно проконсультироваться с нами для получения указаний и рекомендаций.
        </p>
      </div>

      <div className="relative mx-auto mt-8 md:mt-12 max-w-6xl">
        <div
          className="
            group relative overflow-visible
            border border-[rgba(255,255,255,0.08)]
            bg-[#02111E]/70 backdrop-blur-md
            [background-clip:padding-box]
          "
        >
          <div
            className="pointer-events-none absolute -top-20 -left-20 h-[360px] w-[520px] rounded-full opacity-[0.25] blur-[140px] transition-opacity duration-300 group-hover:opacity-[0.30]"
            style={{ background: "linear-gradient(135deg, #03CEA4, #4DA3FF)", willChange: "transform" }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[560px] rounded-full opacity-[0.22] blur-[160px] transition-opacity duration-300 group-hover:opacity-[0.27]"
            style={{ background: "linear-gradient(135deg, #C15CFF, #FF6AD5)", willChange: "transform" }}
          />

          <div
            className="relative overflow-x-auto overscroll-contain lg:overflow-x-hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="region"
            aria-label="Горизонтальная прокрутка таблицы"
          >
            <table
              role="table"
              aria-label="Сравнение опций развертывания"
              className="
                w-full min-w-[900px]
                table-fixed
                text-[15px] md:text-[16px] lg:text-[17px] leading-[1.6]
                border-separate border-spacing-0
              "
            >
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[35%]" />
                <col className="w-[35%]" />
              </colgroup>

              <thead className="bg-white/[0.06] text-white/90">
                <tr className="border-b border-[rgba(255,255,255,0.10)] text-left align-middle">
                  <th
                    scope="col"
                    className="px-5 py-5 md:px-6 md:py-6 border-r border-[rgba(255,255,255,0.06)] whitespace-normal break-words"
                  >
                    Функции
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-5 md:px-6 md:py-6 border-r border-[rgba(255,255,255,0.06)] whitespace-normal break-words"
                  >
                    Облачное развертывание
                  </th>
                  <th scope="col" className="px-5 py-5 md:px-6 md:py-6 whitespace-normal break-words">
                    Локальное развертывание
                  </th>
                </tr>
              </thead>

              <tbody className="text-white/85">
                {ROWS.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`
                      ${idx % 2 === 1 ? "bg-white/5" : "bg-transparent"}
                      border-b border-[rgba(255,255,255,0.06)]
                      transition-transform duration-200 hover:-translate-y-[1px]
                      align-middle
                    `}
                  >
                    <td className="px-5 md:px-6 py-6 md:py-7 border-r border-[rgba(255,255,255,0.06)] whitespace-normal break-words">
                      {row.feature}
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7 border-r border-[rgba(255,255,255,0.06)] whitespace-normal break-words">
                      <CellContent cell={row.cloud} />
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7 whitespace-normal break-words">
                      <CellContent cell={row.local} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
