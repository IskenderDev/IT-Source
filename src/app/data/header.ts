export type SectionId =
  | "home"
  | "services"
  | "equipment"
  | "pricing"
  | "reviews"
  | "faq"
  | "contact";

export const HEADER_LINKS: Array<{ id: SectionId; label: string }> = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "equipment", label: "Оборудование" },
  { id: "pricing", label: "Цены" },
  { id: "reviews", label: "Отзывы" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Контакты" },
];
