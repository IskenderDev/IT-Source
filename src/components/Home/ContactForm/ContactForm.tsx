import { Button } from "../../ui";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative bg-transparent py-20 flex items-center justify-center overflow-hidden px-20"
    >
      <form className="relative z-10 max-w-2xl w-full bg-[#010C15]/50 backdrop-blur-3xl rounded-2xl border border-white/20 p-8 md:p-10 shadow-lg text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute  -left-20 w-[200px] h-[100px] bg-[#B353FF] rounded-full opacity-50 blur-[140px]"
        />

        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold">Связаться с нами</h2>
          <p className="text-sm md:text-lg text-white/70">
            Заполните данную форму и мы с радостью предложим решение вашего вопроса
          </p>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <input
            type="text"
            placeholder="Имя"
            className="w-full rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Электронная почта"
            className="w-full rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none"
          />
        </div>

        <textarea
          placeholder="Что еще вас интересует?"
          className="relative z-10 mt-4 w-full min-h-[140px] md:min-h-[180px] rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none resize-none"
        />

        <div className="relative z-10 pt-3 flex justify-center">
          <Button
            size="md"
            className="transition-shadow hover:shadow-[0_0_20px_#03CEA4]"
          >
            Отправить
          </Button>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-20 -right-20 w-[200px] h-[75px] bg-[#03CEA4] rounded-full opacity-50 blur-[140px]"
        />
      </form>
    </section>
  );
}
