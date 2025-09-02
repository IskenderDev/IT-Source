import { Button, SectionTitle } from "../../ui";
import { PLANS, type Plan } from "../../../app/data/pricingPlans";
function PlanCard({ plan }: { plan: Plan }) {
  const { price, cpu, ram, ssd, features, featured } = plan;

  return (
    <div
      className={[
        featured ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : "",
        "relative isolate h-full w-full",
      ].join(" ")}
    >
      <div
        className={[
          "relative z-10 flex h-full flex-col overflow-hidden border bg-white/5",
          "border-white/10 p-5 sm:p-7 md:p-8 lg:p-10",
          featured
            ? "lg:scale-[1.03] lg:ring-2 lg:ring-white/20 lg:shadow-[0_10px_60px_rgba(10,255,204,.14)]"
            : "",
          "transition-transform duration-300 will-change-transform",
        ].join(" ")}
      >
          <div
            className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full blur-3xl opacity-35"
            style={{
              background:
                "radial-gradient(140px 140px at 50% 50%, rgba(10,252,204,0.45), rgba(0,0,0,0))",
            }}
          />
          <div
            className="pointer-events-none absolute -right-12 -bottom-12 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(160px 160px at 50% 50%, rgba(63,252,212,0.35), rgba(0,0,0,0))",
            }}
          />

        <div className="relative flex items-end gap-2">
          <div className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold text-white leading-none">
            {price}
          </div>
          <div className="pb-0.5 sm:pb-1 text-white/80 font-semibold text-[13px] sm:text-[15px] md:text-[16px] leading-none">
            сом/мес
          </div>
        </div>

        <ul className="mt-4 sm:mt-5 md:mt-6 text-white/85 space-y-1">
          <li className="text-[17px] sm:text-[19px] md:text-[21px]">{cpu}</li>
          <li className="text-[17px] sm:text-[19px] md:text-[21px]">{ram}</li>
          <li className="text-[17px] sm:text-[19px] md:text-[21px]">{ssd}</li>
        </ul>

        <div className="mt-5 sm:mt-6 md:mt-7 relative">
          <Button
            size="lg"
            className="w-full text-[14.5px] sm:text-[15.5px] md:text-[16.5px] !rounded-full !bg-[var(--color-primary-500-gradient)]"
            aria-label={`Выбрать план за ${price} сом/мес`}
          >
            Я хочу это
          </Button>
        </div>

        <div className="my-5 sm:my-6 md:my-7 h-px w-full bg-white/10" />

        <ul className="mt-auto text-left text-white text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed space-y-1.5">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PricingPlans() {
  return (
    <section className="relative w-full py-10 sm:py-14 md:py-20 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-48 sm:h-60 md:h-64 w-[820px] sm:w-[1000px] md:w-[1200px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(1200px 200px at 50% 0%, rgba(10,255,204,.25), rgba(1,23,39,0))",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-4 md:px-8 font-mono">
        <SectionTitle
          heading="Пакеты наших услуг"
          subheading="Изучите наши гибкие тарифные планы, удовлетворяющие потребности любого бизнеса. Выберите план, который соответствует вашему бюджету и требованиям."
        />

        <div
          className={[
            "mt-8 sm:mt-12 md:mt-16 grid",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "items-stretch justify-items-stretch",
            "gap-5 sm:gap-6 md:gap-8 lg:gap-10",
          ].join(" ")}
        >
          {PLANS.map((p, idx) => (
            <PlanCard key={idx} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
