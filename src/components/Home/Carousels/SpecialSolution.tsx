import Slider from "../../ui/Slider/Slider";
import { SPECIAL_SOLUTION_SLIDES } from "../../../app/data/slides";

export default function SpecialSolutions() {
  return (
    <Slider
      heading="Специальные решения"
      subheading="Уникальные продукты и интеграции от IT Source. Собственные разработки и специализированные решения для автоматизации бизнес‑процессов, интеграции систем и создания умных пространств."
      slides={SPECIAL_SOLUTION_SLIDES}
      mobileSlideMinH={650}
    />
  );
}
