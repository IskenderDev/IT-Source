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
      {cell.check && (
        <IoIosCheckmark className="text-[20px] md:text-[22px] text-[#27AE60]" aria-hidden />
      )}
    </div>
  );
}

export default function DeploymentComparisonSection() {
  return (
    <section
      className="relative isolate py-16 md:py-20 px-4 md:px-8 font-mono text-white"
      style={{ background: "#010B14" }}
      aria-label="Сравнение опций развертывания"
    >
      <div className="mx-auto text-center space-y-4 max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-semibold">Детальное сравнение двух опций</h2>
        <p className="text-white/70 md:text-lg">
          В заключение следует отметить, что выбор зависит от конкретных потребностей и требований каждого клиента. Перед
          принятием решения, клиенты должны тщательно проконсультироваться с нами для получения указаний и рекомендаций.
        </p>
      </div>

      {/* Карточка-таблица (без скруглений, glow выходит за границы) */}
      <div className="relative mx-auto mt-8 md:mt-12 max-w-6xl">
        <div
          className="
            group relative overflow-visible rounded-none
            border border-[rgba(255,255,255,0.08)]
            bg-[#02111E]/70 backdrop-blur-md
          "
        >
          {/* Glow в углах — выступают за таблицу */}
          <div
            className="pointer-events-none absolute -top-20 -left-20 h-[360px] w-[520px] rounded-full opacity-[0.25] blur-[140px] transition-opacity duration-300 group-hover:opacity-[0.30]"
            style={{ background: "linear-gradient(135deg, #03CEA4, #4DA3FF)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[560px] rounded-full opacity-[0.22] blur-[160px] transition-opacity duration-300 group-hover:opacity-[0.27]"
            style={{ background: "linear-gradient(135deg, #C15CFF, #FF6AD5)" }}
          />

          {/* Скролл-обёртка ТОЛЬКО для таблицы */}
          <div
            className="relative overflow-x-auto overscroll-contain lg:overflow-x-hidden"
            style={{ WebkitOverflowScrolling: "touch", scrollbarGutter: "stable" }}
            role="region"
            aria-label="Горизонтальная прокрутка таблицы"
          >
            <table
              role="table"
              aria-label="Сравнение опций развертывания"
              className="
                w-full min-w-[900px] min-h-[430px]
                text-[15px] md:text-[16px] lg:text-[17px]
                leading-6 md:leading-[1.6]
              "
            >
              {/* СЕРЫЙ THEAD с бордерами у ячеек */}
              <thead className="bg-white/[0.06] text-white/90">
                <tr
                  className="
                    border-b border-[rgba(255,255,255,0.10)]
                    *:[&>th]:px-8 md:*:[&>th]:px-10
                    *:[&>th]:py-6 md:*:[&>th]:py-7
                    *:[&>th]:font-semibold
                    *:[&>th]:border-l *:[&>th]:border-[rgba(255,255,255,0.10)]
                    first:[&>th]:border-l-0 text-left 
                  "
                  
                >
                  <th className="min-w-[260px] px-5 md:min-w-[300px] whitespace-normal  border-r border-[rgba(255,255,255,0.06)]">Функции</th>
                  <th className="min-w-[260px] px-5 border-r border-[rgba(255,255,255,0.06)]">Облачное развертывание</th>
                  <th className="min-w-[260px] px-5 border-r border-[rgba(255,255,255,0.06)]">Локальное развертывание</th>
                </tr>
              </thead>

              <tbody className="text-white/85">
                {ROWS.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`
                      min-h-[72px] md:min-h-[88px]
                      ${idx % 2 === 1 ? "bg-white/5" : "bg-transparent"}
                      border-b border-[rgba(255,255,255,0.06)]
                      transition-transform duration-200 hover:-translate-y-[1px]
                      *:[&>td]:px-8 md:*:[&>td]:px-10
                      *:[&>td]:py-6 md:*:[&>td]:py-7
                      *:[&>td]:align-middle
                      *:[&>td]:border-l *:[&>td]:border-[rgba(255,255,255,0.06)]
                      first:[&>td]:border-l-0
                    `}
                  >
                    <td className="min-w-[260px] md:min-w-[300px] px-5 whitespace-normal break-words border-r border-[rgba(255,255,255,0.06)]">
                      {row.feature}
                    </td>
                    <td className="min-w-[260px] whitespace-normal break-words border-r border-[rgba(255,255,255,0.06)]">
                      <CellContent cell={row.cloud} />
                    </td>
                    <td className="min-w-[260px] whitespace-normal break-words">
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
