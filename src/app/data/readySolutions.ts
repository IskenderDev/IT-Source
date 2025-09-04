export type Solution = {
  id: string;
  title: string;
  image: string;
  modalImage?: string;
  contactHref?: string;
  bullets: string[];
};

export const DEFAULT_SOLUTIONS: Solution[] = [
  {
    id: "industry",
    title: "Для производственных предприятий",
    image: "/assets/sectors/industry.png",
    modalImage: "/assets/sectors/industry-modal.png",
    contactHref: "/#contact",
    bullets: [
      "Пропускная система для работников",
      "Контроль доступа в производственные зоны",
      "Учёт рабочего времени",
      "Интеграция с системами безопасности",
    ],
  },
  {
    id: "hotel",
    title: "Для гостиниц",
    image: "/assets/sectors/hotel.png",
    modalImage: "/assets/sectors/hotel-modal.png",
    contactHref: "/#contact",
    bullets: [
      "Датчики атмосферы объекта — температура, влажность, качество воздуха",
      "Умное освещение — автоматическое управление в зависимости от присутствия",
      "Системы климат‑контроля — оптимизация энергопотребления",
      "Мониторинг оборудования — предиктивная аналитика и предупреждение поломок",
    ],
  },
  {
    id: "business",
    title: "Для бизнес центров",
    image: "/assets/sectors/bizcenter.png",
    modalImage: "/assets/sectors/bizcenter-modal.png",
    contactHref: "/#contact",
    bullets: [
      "Управление парковкой",
      "Система бронирования переговорных",
      "Контроль доступа арендаторов",
      "Мониторинг инженерных систем",
    ],
  },
];
