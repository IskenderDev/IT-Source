import Slider from "../../ui/Slider/Slider";
import { SOLUTIONS_SLIDES } from "../../../app/data/solutionsSlides";

export default function SolutionsSection() {
  return (
    <Slider
      showGlow
      glowColor="#FFEE53"
      className="mt-20 md:mt-52"
      heading="Проектирование и внедрение решений"
      subheading="Проектируем слаботочные, сетевые и серверные системы, создаём комплексные проекты для офисной инфраструктуры и внедряем их под ключ."
      slides={SOLUTIONS_SLIDES}
      mobileImageTop={false}
      mobileSlideMinH={400}
    />
  );
}
