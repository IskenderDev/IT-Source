import ServiceHero from "../../Services/ServiceHero/ServiceHero";

const TariffsHero = () => (
  <ServiceHero
    image={
      <picture>
        <source media="(max-width: 640px)" srcSet={`${import.meta.env.BASE_URL}assets/tariffs-hero-small.svg`} />
        <img
          src={`${import.meta.env.BASE_URL}assets/tariffs-hero.svg`}
          alt="1C:Enterprise — удалённый доступ"
          className="relative z-10 w-full -mb-30 md:-mb-0 select-none"
          loading="eager"
        />
      </picture>
    }
    title={`Безопасный удаленный доступ\nк приложениям 1C:Enterprise`}
    subtitle={`Наслаждайтесь быстрым и надежным подключением, лёгкой интеграцией\nс существующим программным обеспечением «1C:Enterprise» и\nспокойствием за безопасность ваших данных благодаря принятым\nв отрасли мерам безопасности.`}
    ctaLabel="Связаться с нами"
  />
);

export default TariffsHero;
export { TariffsHero as ServiceHeroTariffs };
