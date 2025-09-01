import React from "react";
import { SectionTitle } from "../../ui";

export type Stage = {
  number: number;
  title: string;
  subtitle: string;
};

export type ProjectPhasesProps = {
  heading?: string;
  stages?: Stage[];
  className?: string;
};

const DEFAULT_STAGES: Stage[] = [
  {
    number: 1,
    title: "Анализ требований",
    subtitle: "изучение задач и особенностей объекта",
  },
  {
    number: 2,
    title: "Проектирование",
    subtitle: "создание технической документации и схем",
  },
  {
    number: 3,
    title: "Поставка оборудования",
    subtitle: "подбор совместимых и надежных решений",
  },
  {
    number: 4,
    title: "Монтаж и настройка",
    subtitle:
      "профессиональная установка силами сертифицированных специалистов",
  },
  {
    number: 5,
    title: "Тестирование",
    subtitle: "комплексная проверка работоспособности систем",
  },
  {
    number: 6,
    title: "Обучение и поддержка",
    subtitle:
      "передача проекта заказчику с полной документацией, поддержка и техобслуживание",
  },
];

export default function ProjectPhases({
  heading = "Этапы реализации проекта",
  stages = DEFAULT_STAGES,
  className = "",
}: ProjectPhasesProps) {
  return (
    <section className={`relative font-mono  text-white flex flex-col text-center justify-center items-center ${className} `}>
      <SectionTitle heading={heading} />
      <div className="absolute inset-0 -z-10" />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_100%_at_50%_50%,#000_55%,transparent_100%)]">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[75%] w-[28%] rounded-[999px] blur-2xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(59,252,212,0.12) 0%, rgba(9,190,160,0.08) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-[70%] w-[30%] rounded-[999px] blur-2xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(59,252,212,0.12) 0%, rgba(9,190,160,0.08) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-transparent md:bg-white/10" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-transparent md:bg-white/10" />

      

        <div className="grid grid-cols-1 md:grid-cols-3">
          {stages.map((s) => (
            <StageCell key={s.number} stage={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCell({ stage }: { stage: Stage }) {
  return (
    <div className="relative flex flex-col items-center px-6 py-10 text-center">
      <div className="text-[68px] font-semibold text-[#6F6F6F]">
        {stage.number}
      </div>
      <span
        className="relative my-2 h-2 w-2 rounded-full bg-emerald-400/80"
        aria-hidden
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-emerald-400/30 blur-[6px]" />
      </span>
      <h3 className="mt-1 text-[16px] font-semibold text-white md:text-[32px]">
        {stage.title}
      </h3>
      <p className="mt-1 max-w-[36ch] text-sm text-white/70 md:text-lg">
        {stage.subtitle}
      </p>
    </div>
  );
}
