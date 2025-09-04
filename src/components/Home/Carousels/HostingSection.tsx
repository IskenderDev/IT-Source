import Slider from "../../ui/Slider/Slider";
import { HOSTING_SLIDES } from "../../../app/data/slides";

export default function HostingSection() {
  return (
    <Slider
      showGlow
      glowColor="#03CEA4"
      className="mt-14 md:mt-24"
      heading="Аренда серверов"
      subheading="Готовые серверные мощности в надёжном ЦОД: производительные серверы, хранилища и сетевые ресурсы с гарантией SLA и поддержкой 24/7."
      slides={HOSTING_SLIDES}
    />
  );
}
