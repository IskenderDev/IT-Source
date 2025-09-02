import { IoIosCheckmark } from "react-icons/io";

type Cell = { text: string; check?: boolean };
type Row = { feature: string; cloud: Cell; local: Cell };

const ROWS: Row[] = [
  { feature: "Первоначальные затраты", cloud: { text: "Меньше", check: true }, local: { text: "Больше" } },
  { feature: "Масштабируемость", cloud: { text: "Большая", check: true }, local: { text: "Маленькая" } },
  { feature: "Доступность", cloud: { text: "Высокая", check: true }, local: { text: "Маленькая" } },
  { feature: "Безопасность", cloud: { text: "Высокая", check: true }, local: { text: "Высокая", check: true } },
  { feature: "Опции персонализации", cloud: { text: "Меньше" }, local: { text: "Больше", check: true } },
  { feature: "Зависимость от интернета", cloud: { text: "Есть" }, local: { text: "Нет", check: true } },
  { feature: "Контроль над данными и безопасностью", cloud: { text: "Меньше" }, local: { text: "Больше", check: true } },
  { feature: "Подписка", cloud: { text: "Есть", check: true }, local: { text: "Нет" } },
];

function CellContent({ cell }: { cell: Cell }) {
  return (
    <div
      tabIndex={0}
      className="inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#4DA3FF]/40 rounded-md px-5"
      aria-label={cell.text}
    >
      <span className="whitespace-normal break-words">{cell.text}</span>
      {cell.check && (
        <IoIosCheckmark className="text-[20px] md:text-[22px] text-[#27AE60]" aria-hidden />
      )}
    </div>
  );
}

export default function OptionsComparisonSection() {
  return (
    <section className="relative isolate py-20 px-4 md:px-8 font-mono text-white">
      <div className="mx-auto text-center space-y-4 max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-semibold">Детальное сравнение двух опций</h2>
        <p className="text-white/70 md:text-lg">
          В заключение следует отметить, что выбор зависит от конкретных потребностей и требований каждого клиента.
          Прежде чем принять решение, клиенты должны тщательно проконсультироваться с нами для получения указаний и
          рекомендаций.
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
          >
            <table
              className="
                w-full min-w-[900px]
                table-fixed
                text-[15px] md:text-[16px] lg:text-[17px]
                border-separate border-spacing-0
              "
            >
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[35%]" />
                <col className="w-[35%]" />
              </colgroup>

              <thead className="bg-white/[0.06] text-white/90">
                <tr className="border-b border-[rgba(255,255,255,0.10)] text-left">
                  <th className="px-5 py-6 md:px-6 md:py-6 font-semibold border-r border-[rgba(255,255,255,0.06)]">
                    Функция
                  </th>
                  <th className="px-5 py-6 md:px-6 md:py-6 font-semibold border-r border-[rgba(255,255,255,0.06)]">
                    Облачное развертывание
                  </th>
                  <th className="px-5 py-6 md:px-6 md:py-6 font-semibold">
                    Локальное развертывание
                  </th>
                </tr>
              </thead>

              <tbody className="text-white/85">
                {ROWS.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`${idx % 2 === 1 ? "bg-white/5" : "bg-transparent"} border-b border-[rgba(255,255,255,0.06)]`}
                  >
                    <td className="px-5 md:px-6 py-6 md:py-7">{row.feature}</td>
                    <td className="px-5 md:px-6 py-6 md:py-7 border-l border-[rgba(255,255,255,0.06)]">
                      <CellContent cell={row.cloud} />
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7 border-l border-[rgba(255,255,255,0.06)]">
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
