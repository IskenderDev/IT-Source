type ProductCard = {
  title: string;
  text: string;
  imageSrc: string;
  glow: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: ProductCard[];
  className?: string;
};

const DEFAULT_ITEMS: ProductCard[] = [
  {
    title: "Стоечные серверы",
    text: "Серверы для установки в стойку 19” — оптимальное решение по плотности и производительности для центров обработки данных.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/rack.png`,
    glow: "#7C5CFF",
  },
  {
    title: "Устройства NAS",
    text: "Сетевые хранилища для безопасного хранения и общего доступа к данным в офисе с централизованным управлением.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/nas.png`,
    glow: "#03CEA4",
  },
  {
    title: "Башенные серверы",
    text: "Автономные серверы для офиса и небольших серверных, легко масштабируются и не требуют стойки.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/tower.png`,
    glow: "#FF6A00",
  },
  {
    title: "Серверы высокопроизводительных вычислений (HPC)",
    text: "Решения для задач ИИ/ML, расчётов и моделирования с высокой пропускной способностью и большим объёмом памяти.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/hpc.png`,
    glow: "#E6FF54",
  },
  {
    title: "Серверы с GPU-ускорением",
    text: "Оптимизированы для глубокого обучения, рендеринга и VDI-нагрузок с мощными ускорителями GPU.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/gpu.png`,
    glow: "#4ADE80",
  },
  {
    title: "Серверы виртуализации",
    text: "Плотная консолидация ресурсов, высокая доступность и отказоустойчивость для виртуальных сред.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/virtualization.png`,
    glow: "#F43F5E",
  },
  {
    title: "Blade-серверы",
    text: "Компактные решения для максимальной плотности вычислений и упрощённого управления в рамках единого шасси.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/blade.png`,
    glow: "#60A5FA",
  },
  {
    title: "Облачные серверы",
    text: "Гибкая инфраструктура с быстрым развёртыванием ресурсов и безопасным доступом через интернет.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/cloud.png`,
    glow: "#F59E0B",
  },
  {
    title: "Серверы хранения данных",
    text: "Масштабируемые системы для построения отказоустойчивых СХД и быстрой доставки данных приложениям.",
    imageSrc: `${import.meta.env.BASE_URL}assets/products/storage.png`,
    glow: "#A78BFA",
  },
];

export default function ProductsSection({
  title = "Предлагаемая продукция",
  subtitle = `Мы предлагаем широкий ассортимент серверного оборудования, включая стоечные, башенные, NAS, системы хранения, виртуализацию, серверы с GPU-ускорением и многое другое.`,
  items = DEFAULT_ITEMS,
  className = "",
}: Props) {
  return (
    <section
      id="products"
      className={`relative w-full py-20 bg-[#010B14] text-white font-mono ${className}`}
    >
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-white/70 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="mx-auto mt-10 md:mt-12 max-w-6xl px-4">
        <div className="grid gap-4 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((card, i) => (
            <ProductCardView key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCardView({
  card,
  index,
}: {
  card: ProductCard;
  index: number;
}) {
  const glowOnTop = index % 2 === 0;

  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl
        bg-transparent               
        backdrop-blur-[40px]      
        p-5 md:p-6
        min-h-[300px]
        flex flex-col
        transition-shadow
      "
    >
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          [padding:1px]
          before:content-[''] before:absolute before:inset-0 before:rounded-[calc(theme(borderRadius.2xl)-1px)]
          before:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0))]
          before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
          before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] 
        "
      />

      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      />

      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/4 -z-10 -translate-x-1/2 ${
          glowOnTop ? "-top-20" : "-bottom-20"
        }`}
        style={{
          width: 300,
          height: 200,
          borderRadius: "9999px",
          background: card.glow,
          filter: "blur(140px)",
          opacity: 0.45,
        }}
      />

      <img
        src={card.imageSrc}
        alt={card.title}
        className="w-full h-[200px] object-contain mb-2 md:mb-4"
        loading="lazy"
      />

      <h3 className="text-lg md:text-xl font-semibold leading-tight mb-2">
        {card.title}
      </h3>
      <p className="text-sm md:text-base text-white/70 leading-relaxed">
        {card.text}
      </p>
    </article>
  );
}
