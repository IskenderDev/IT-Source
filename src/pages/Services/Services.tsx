import ServiceHero from "../../components/Services/ServiceHero/ServiceHero";

const Services = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(180deg, #010B14 0%, rgba(1, 11, 20, 0) 100%)",
      }}
    >
      <ServiceHero
        svgSrc={"/assets/servers-hero.svg"}
        title={"Раскройте мощь первоклассного серверного оборудования"}
        subtitle={
          'Сервис "Серверное оборудование" предназначен для обеспечения предприятий аппаратными и программными решениями для максимально эффективных ИТ-операций.'
        }
      />
    </div>
  );
};

export default Services;
