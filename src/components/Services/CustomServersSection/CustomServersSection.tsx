import { FaServer } from "react-icons/fa";
import { Button } from "../../ui";

export default function CustomServersSection() {
  return (
    <section className="relative bg-[#010B14] py-20 px-6 md:px-12 font-mono text-white">
      <div className="relative z-10 max-w-7xl mx-auto border border-white/10 px-8 md:px-12 bg-[#02111e] backdrop-blur-sm shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
          <div className="space-y-6">
            <FaServer className="text-[#03CEA4] text-3xl" />
            <h2 className="text-2xl md:text-3xl font-semibold">
              Кастомные серверы
            </h2>
            <p className="text-white/80 leading-relaxed">
              Серверы, созданные в соответствии с конкретными требованиями
              заказчика, с индивидуальными конфигурациями аппаратного и
              программного обеспечения.
              <br />
              Свяжитесь с нами, чтобы мы собрали для вас кастомный сервер!
            </p>
          </div>

          <div
            className="
              col-span-1 md:col-span-1 lg:col-span-1
              bg-[#02111e] h-full
              min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]
              flex items-center justify-center p-4 md:p-6
            "
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/custom-server.png`}
              alt="Custom Server"
              className="h-full max-h-full w-auto object-contain"
            />
          </div>
          <form
            className="flex flex-col gap-4 p-6 shadow-lg h-fit"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
            <label htmlFor="name" className="text-xs md:text-sm text-white/70">
                Ваше имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Как к вам обращаться?"
                className="w-full bg-[#0e1d29] border border-white/10 px-4 py-3 text-sm placeholder-[#57616a] focus:outline-none focus:ring-2 focus:ring-[#03CEA4]"
              />
            </div>
            <div>
            <label htmlFor="email" className="text-xs md:text-sm text-white/70">
            Почта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Куда нам отправить ответ?"
                className="w-full bg-[#0e1d29] border border-white/10 px-4 py-3 text-sm placeholder-[#57616a] focus:outline-none focus:ring-2 focus:ring-[#03CEA4]"
              />
            </div>
            <Button
              size="lg"
              type="submit"
              className="mt-auto w-full py-3 text-[#010B14] font-semibold bg-gradient-to-r from-[#03CEA4] to-[#00FFC6] transition-transform hover:scale-105"
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
