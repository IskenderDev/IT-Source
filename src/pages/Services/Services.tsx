import ContactAddressSection from "../../components/Services/ContactAddressSection/ContactAddressSection";
import CustomServersSection from "../../components/Services/CustomServersSection/CustomServersSection";
import ProductsSection from "../../components/Services/ProductsSection/ProductsSection";
import ServerEquipment from "../../components/Services/ServerEquipment/ServerEquipment";
import ServerOptions from "../../components/Services/ServerOptions/ServerOptions";
import ServersBenefits from "../../components/Services/ServersBenefits/ServersBenefits";
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
        svgSrc={`${import.meta.env.BASE_URL}assets/servers-hero.svg`}
        title={"Раскройте мощь первоклассного серверного оборудования"}
        subtitle={
          'Сервис "Серверное оборудование" предназначен для обеспечения предприятий аппаратными и программными решениями для максимально эффективных ИТ-операций.'
        }
      /> 
      <ServerEquipment/> 
      <CustomServersSection/>
      <ProductsSection/> 
      <ServersBenefits/> 
      <ServerOptions/> 
      <ContactAddressSection/> 
      
    </div>
  );
};

export default Services;
