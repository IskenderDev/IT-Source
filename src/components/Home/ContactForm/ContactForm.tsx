import { Button } from "../../ui";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative py-24 flex items-center justify-center px-4 overflow-hidden"
    >
      <div
        className="absolute w-[200px] h-[100px] bg-[#6A5ACD] rounded-full blur-[160px]"
        style={{ top: "150px", left: "35%", transform: "translate(-50%, -50%)", zIndex: 0 }}
      />
   



      <form className="border border-white/20 relative max-w-2xl w-full bg-[#010C15]/50 backdrop-blur-2xl rounded-2xl p-8 md:p-10 flex flex-col gap-6 text-white shadow-lg z-10">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold">Связаться с нами</h2>
          <p className="text-sm md:text-lg text-white/70">
            Заполните данную форму и мы с радостью предложим решение вашего вопроса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <input
            type="text"
            placeholder="Имя"
            className="w-full rounded-xl bg-[#1F2733]/80 px-4 py-3 md:px-6 md:py-4 placeholder:text-white/50 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Электронная почта"
            className="w-full rounded-xl bg-[#1F2733]/80 px-4 py-3 md:px-6 md:py-4 placeholder:text-white/50 focus:outline-none"
          />
        </div>

        <textarea
          placeholder="Что еще вас интересует?"
          className="w-full min-h-[140px] md:min-h-[180px] rounded-xl bg-[#1F2733]/80 px-4 py-3 md:px-6 md:py-4 placeholder:text-white/50 focus:outline-none resize-none"
        />

        <div className="pt-2 flex justify-center">
          <Button size="md">Отправить</Button>
        </div>
      </form>
    </section>
  );
}
