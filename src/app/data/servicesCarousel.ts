import type { EmblaOptionsType } from "embla-carousel";

export const SERVICE_SLIDES = [
  {
    image: "/slides/exp.png",
    title: "Экспертиза",
    subtitle: "Аудит, консалтинг, анализ инфраструктуры",
    cta: { label: "Подробнее", href: "/services/expertise" },
    ghost: { label: "Скачать чек-лист", href: "/files/checklist.pdf" },
  },
  {
    image: "/slides/design.png",
    title: "Проектирование под ключ",
    subtitle: "Сетевые, серверные и слаботочные решения",
    cta: { label: "Подробнее", href: "/services/design" },
  },
  {
    image: "/slides/hosting.png",
    title: "Аренда серверов",
    subtitle: "Готовая IT-инфраструктура в ЦОД без перерывов",
    cta: { label: "Подробнее", href: "/services/servers" },
  },
  {
    image: "/slides/special.png",
    title: "Специальные решения",
    subtitle: "UKEY, IoT, интеграции, автоматизация",
    cta: { label: "Подробнее", href: "/services/special" },
  },
];

export const SERVICE_OPTIONS: EmblaOptionsType = { loop: true, align: "start" };
