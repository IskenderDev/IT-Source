import { Button } from "../../ui";

export default function TransformationCTA() {
  return (
    <section className="w-full py-20 text-center ">
      <div className="mx-auto max-w-4xl px-4 font-mono">
        <h2 className="text-white text-6xl">
          Начните цифровую трансформацию сегодня
        </h2>

        <p className="text-lg md:text-4xl text-[#53FFA2] my-8">
          Автоматизируйте процессы, защитите данные и повысьте эффективность с
          IT Source.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="/check-lists/check-list_1.pdf" download>
            <Button size="lg">Начать трансформацию</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
