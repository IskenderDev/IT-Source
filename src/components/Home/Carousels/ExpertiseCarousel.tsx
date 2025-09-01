import Slider from "../../ui/Slider/Slider";
import { EXPERTISE_SLIDES } from "../../../app/data/expertiseSlides";

export default function ExpertiseSection() {
  return (
    <Slider
      heading="Экспертиза"
      subheading="Наша команда проводит комплексную диагностику, выявляет проблемы и предлагает решения для оптимизации, безопасности и масштабирования."
      slides={EXPERTISE_SLIDES}
    />
  );
}
