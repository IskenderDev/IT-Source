export type Plan = {
  price: number;
  cpu: string;
  ram: string;
  ssd: string;
  features: string[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
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
