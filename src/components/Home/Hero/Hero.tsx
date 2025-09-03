import { Button } from "../../ui";

export default function Hero() {
  
  return (
    <section
      className="w-full min-h-screen flex flex-col justify-center items-center text-center px-6"
      style={{
        background: "linear-gradient(0.13deg, #001B32 0.12%, #064982 82.16%)",
      }}
    >
      <h1 className="text-white font-bold text-3xl md:text-6xl leading-snug font-mono">
        <span className="text-[#03CEA4]">IT Source</span> – Грамотные IT-решения <br />
        для бизнеса любого масштаба
      </h1>

      <p className="text-white/80 text-base md:text-lg mt-6 max-w-xl">
        Проектируем, внедряем и поддерживаем современную IT-инфраструктуру от
        слаботочных систем до серверных решений.
      </p>

      <div className="mt-10">
        <Button size="lg" href="#contact">Подробнее</Button>
      </div>
    </section>
  );
}
