import { useState } from "react";
import { Button } from "../../ui";

type Status = "idle" | "success" | "error";

type LeadResponse =
  | { ok: true; leadId: number; leadUrl?: string }
  | { ok: false; error: string };

function isErrorLike(x: unknown): x is { message?: string } {
  return typeof x === "object" && x !== null && "message" in x;
}

const COUNTRY_CODES = [
  { code: "+996", name: "Киргизстан" },
  { code: "+7", name: "Казахстан/Россия" },
  { code: "+998", name: "Узбекистан" },
  { code: "+992", name: "Таджикистан" },
  { code: "+993", name: "Туркменистан" },
  { code: "+994", name: "Азербайджан" },
  { code: "+995", name: "Грузия" },
  { code: "+374", name: "Армения" },
  { code: "+90", name: "Турция" },
  { code: "+380", name: "Украина" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+996",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    setFormData((s) => ({ ...s, phone: digitsOnly }));
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFormData((s) => ({ ...s, countryCode: e.target.value }));
  }

  function normalizedPhone(raw: string) {
    return raw.replace(/[^\d]/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setNotice("");

    const phoneDigits = normalizedPhone(formData.phone);
    if (phoneDigits.length < 6) {
      setLoading(false);
      setStatus("error");
      setNotice("Проверьте номер телефона.");
      return;
    }

    try {
      const fullPhone = `${formData.countryCode} ${phoneDigits}`;

      const body = {
        name: formData.name,
        phone: fullPhone,
        message: formData.message,
        page: window.location.href,
        utm: Object.fromEntries(new URLSearchParams(window.location.search)),
      };

      const r = await fetch("/api/b24-lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: LeadResponse = await r.json();

      if (data.ok) {
        console.log(`Lead created: ID=${data.leadId} ${data.leadUrl ?? ""}`);
        setStatus("success");
        setNotice(`Заявка отправлена. №${data.leadId}`);
        setFormData({ name: "", countryCode: "+996", phone: "", message: "" });
      } else {
        console.error("Bitrix24 error:", data.error);
        setStatus("error");
        setNotice("Ошибка отправки. Попробуйте позже.");
      }
    } catch (err: unknown) {
      console.error(
        "Network/API error:",
        isErrorLike(err) ? err.message : String(err)
      );
      setStatus("error");
      setNotice("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-transparent py-20 flex items-center justify-center px-3"
    >
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-2xl w-full bg-[#010C15]/50 backdrop-blur-3xl rounded-2xl border border-white/20 p-8 md:p-10 shadow-lg text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -left-12 w-[300px] h-[300px] bg-[#6A5ACD] rounded-full opacity-35 blur-[200px]"
        />

        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold">Связаться с нами</h2>
          <p className="text-sm md:text-lg text-white/70">
            Заполните данную форму и мы с радостью предложим решение вашего вопроса
          </p>
        </div>

        {status !== "idle" && (
          <div
            role="status"
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              status === "success"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                : "bg-rose-500/15 text-rose-300 border border-rose-400/30"
            }`}
          >
            {notice}
          </div>
        )}

        <div className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <label className="block">
            <span className="sr-only">Имя</span>
            <input
              name="name"
              type="text"
              placeholder="Имя"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none"
            />
          </label>

          <div className="flex items-stretch">
            <label className="sr-only" htmlFor="countryCode">
              Код страны
            </label>
            <select
              id="countryCode"
              value={formData.countryCode}
              onChange={handleCodeChange}
              className="rounded-l-2xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none "
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code} title={`${c.name} (${c.code})`}>
                  {c.code}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="phone">
              Номер телефона
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="Номер телефона"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className="w-full rounded-r-2xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none"
            /> 
          </div>
        </div>

        <label className="block">
          <span className="sr-only">Сообщение</span>
          <textarea
            name="message"
            placeholder="Что еще вас интересует?"
            value={formData.message}
            onChange={handleChange}
            className="relative z-10 mt-4 w-full min-h-[140px] md:min-h-[180px] rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none resize-none"
          />
        </label>

        <div className="relative z-10 pt-3 flex flex-col items-center space-y-2">
          <Button
            size="md"
            className="transition-shadow hover:shadow-[0_0_20px_#03CEA4]"
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить"}
          </Button>
        </div>

        {/* нижний glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-20 -right-20 w-[200px] h-[75px] bg-[#03CEA4] rounded-full opacity-50 blur-[140px]"
        />
      </form>
    </section>
  );
}
