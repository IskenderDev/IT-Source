
import Packages from "../../components/Tariffs/Packages/Packages";
import RdpDeploymentOptions from "../../components/Tariffs/RdpDeploymentOptions/RdpDeploymentOptions";
import SecuritySection from "../../components/Tariffs/SecuritySection/SecuritySection";
import TariffsBenefits from "../../components/Tariffs/TariffsBenefits/TariffsBenefits";
import TariffsHero from "../../components/Tariffs/TariffsHero/TariffsHero";
import TechnicalRequirements from "../../components/Tariffs/TechnicalRequirements/TechnicalRequirements";

const Tariffs = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(180deg, #010B14 0%, rgba(1, 11, 20, 0) 100%)",
      }}
    >
      <TariffsHero />
      <TariffsBenefits/>
      <TechnicalRequirements/>
      <RdpDeploymentOptions/>
      <SecuritySection/>
     <Packages/>
    </div>
  );
};

export default Tariffs;
