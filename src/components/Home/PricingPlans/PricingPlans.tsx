import { Button, SectionTitle } from "../../ui";

/* ---------- Типы ---------- */
type Plan = {
  price: number;
  cpu: string;
  ram: string;
  ssd: string;
  features: string[];
  featured?: boolean;
};

/* ---------- Данные ---------- */
const plans: Plan[] = [
  {
    price: 6500,
    cpu: "8 ядер",
    ram: "16 RAM",
    ssd: "SSD 128",
    features: [
      "Техподдержка",
      "UPS",
      "Генератор",
      "Доступность 24/7/365",
      "Антивирус",
      "Ежедневное резервное копирование",
    ],
  },
  {
    price: 8500,
    cpu: "16 ядер",
    ram: "24 RAM",
    ssd: "SSD 256",
    featured: true,
    features: [
      "Техподдержка",
      "UPS",
      "Генератор",
      "Доступность 24/7/365",
      "Антивирус",
      "Ежедневное резервное копирование",
    ],
  },
  {
    price: 11500,
    cpu: "32 ядра",
    ram: "32 RAM",
    ssd: "SSD 512",
    features: [
      "Техподдержка",
      "UPS",
      "Генератор",
      "Доступность 24/7/365",
      "Антивирус",
      "Ежедневное резервное копирование",
    ],
  },
];

/* ---------- UI ---------- */
function PlanCard({ plan }: { plan: Plan }) {
  const { price, cpu, ram, ssd, features, featured } = plan;

  return (
    <div
      className={[
        // сеточное позиционирование для адаптивности
        featured ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : "",
        // карточка
        "relative isolate h-full w-full max-w-[480px] sm:max-w-none",
      ].join(" ")}
    >
      <div
        className={[
          "relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border bg-white/5",
          "border-white/10 p-6 sm:p-8 md:p-10",
          featured
            ? "lg:scale-[1.04] lg:ring-2 lg:ring-white/20 lg:shadow-[0_10px_60px_rgba(10,255,204,.15)]"
            : "",
          "transition-transform duration-300 will-change-transform",
        ].join(" ")}
      >
        {/* светящиеся шарики — мягче на мобилках */}
        <div
          className="pointer-events-none absolute -left-14 -top-14 h-40 w-40 sm:h-48 sm:w-48 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(140px 140px at 50% 50%, rgba(10,252,204,0.45), rgba(0,0,0,0))",
          }}
        />
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 sm:h-56 sm:w-56 rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(160px 160px at 50% 50%, rgba(63,252,212,0.35), rgba(0,0,0,0))",
          }}
        />

        {/* Цена */}
        <div className="relative flex items-end gap-2">
          <div className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-white">
            {price}
          </div>
          <div className="pb-0.5 sm:pb-1 text-white/80 font-semibold text-[14px] sm:text-[16px] md:text-[18px]">
            сом/мес
          </div>
        </div>

        {/* Основные характеристики */}
        <ul className="mt-4 sm:mt-5 md:mt-6 text-white/85 space-y-1.5">
          <li className="text-[18px] sm:text-[20px] md:text-[22px]">{cpu}</li>
          <li className="text-[18px] sm:text-[20px] md:text-[22px]">{ram}</li>
          <li className="text-[18px] sm:text-[20px] md:text-[22px]">{ssd}</li>
        </ul>

        {/* Кнопка */}
        <div className="mt-6 sm:mt-7 md:mt-8 relative">
          <Button
            size="lg"
            className="w-full text-[15px] sm:text-[16px] md:text-[17px] !rounded-full !bg-[var(--color-primary-500-gradient)]"
            aria-label={`Выбрать план за ${price} сом/мес`}
          >
            Я хочу это
          </Button>
        </div>

        {/* разделитель */}
        <div className="my-6 sm:my-7 md:my-8 h-px w-full bg-white/10" />

        {/* Список фичей — растягиваем, чтобы низ карточек ровнялся */}
        <ul className="text-left text-white text-[14.5px] sm:text-[15.5px] md:text-[16.5px] leading-relaxed space-y-1 mt-auto">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Секция ---------- */
export default function PricingPlans() {
  return (
    <section
      className="relative w-full py-12 sm:py-14 md:py-20 text-center"
    >
      {/* фон за секцией */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-56 sm:h-64 w-[900px] sm:w-[1200px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(1200px 200px at 50% 0%, rgba(10,255,204,.25), rgba(1,23,39,0))",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 md:px-8 font-mono">
        <SectionTitle
          heading="Пакеты наших услуг"
          subheading="Изучите наши гибкие тарифные планы, удовлетворяющие потребности любого бизнеса. Выберите план, который соответствует вашему бюджету и требованиям, а мы позаботимся обо всём остальном."
        />

        {/* Сетка карточек */}
        <div
          className={[
            "mt-10 sm:mt-14 md:mt-20 grid",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "items-stretch justify-items-center",
            "gap-6 sm:gap-7 md:gap-8 lg:gap-10",
          ].join(" ")}
        >
          {plans.map((p, idx) => (
            <PlanCard key={idx} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
