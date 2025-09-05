import { useState } from "react";
import { Button } from "../../ui";

type Status = "idle" | "success" | "error";

type LeadOk = { ok: true; leadId: number; leadUrl?: string };
type LeadFail = { ok: false; error: string; raw?: unknown };
type LeadResponse = LeadOk | LeadFail;

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

const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";
function apiUrl(path: string) {
  return `${API_BASE.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

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
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
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
    if (loading) return;

    setLoading(true);
    setStatus("idle");
    setNotice("");

    const name = formData.name.trim();
    const phoneDigits = normalizedPhone(formData.phone);

    if (name.length < 2) {
      setLoading(false);
      setStatus("error");
      setNotice("Укажите корректное имя (минимум 2 символа).");
      return;
    }
    if (phoneDigits.length < 6) {
      setLoading(false);
      setStatus("error");
      setNotice("Проверьте номер телефона.");
      return;
    }

    try {
      const fullPhone = `${formData.countryCode} ${phoneDigits}`;

      const qs = new URLSearchParams(window.location.search);
      const utm = Object.fromEntries(qs.entries());

      const body = {
        name,
        phone: fullPhone,
        message: formData.message.trim(),
        page: window.location.href,
        utm,
      };

     const r = await fetch(apiUrl("b24-lead.php"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(body),
});

      // пытаемся аккуратно разобрать ответ (может быть пустым при ошибке сервера)
      let data: LeadResponse | null = null;
      const contentType = r.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          data = (await r.json()) as LeadResponse;
        } catch {
          data = null;
        }
      }

      if (!r.ok) {
        const msg =
          (data && "error" in data && data.error) || `HTTP ${r.status}`;
        throw new Error(msg);
      }

      if (data && data.ok) {
        console.log(`Lead created: ID=${data.leadId} ${data.leadUrl ?? ""}`);
        setStatus("success");
        setNotice("Заявка отправлена.");
        setFormData({ name: "", countryCode: "+996", phone: "", message: "" });
      } else if (data && !data.ok) {
        console.error("Bitrix24 error:", data.error, data.raw);
        setStatus("error");
        setNotice("Ошибка отправки. Попробуйте позже.");
      } else {
        // неожиданный формат успешного ответа
        setStatus("success");
        setNotice("Заявка отправлена.");
        setFormData({ name: "", countryCode: "+996", phone: "", message: "" });
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
        noValidate
        className="relative z-10 max-w-2xl w-full bg-[#010C15]/50 backdrop-blur-3xl rounded-2xl border border-white/20 p-8 md:p-10 shadow-lg text-white"
      >
        {/* glow background */}
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
              minLength={2}
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
              className="rounded-l-2xl bg-[#1F2733]/80 text-white px-6 py-4 focus:outline-none"
              aria-label="Код страны"
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
            aria-busy={loading}
          >
            {loading ? "Отправка..." : "Отправить"}
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
