import { useState } from "react";
import { FaServer } from "react-icons/fa";
import { Button } from "../../ui";

/** Совместимые типы/утилы с ContactForm */
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

export default function CustomServersSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+996",
    phone: "",
    message: "Интересует сборка кастомного сервера.",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    setFormData((s) => ({ ...s, phone: digitsOnly }));
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

      // как и в ContactForm: name, phone, message, page, utm
      // email отправим в message, чтобы не ломать бэкенд-валидаторы
      const body = {
        name,
        phone: fullPhone,
        message:
          (formData.message?.trim() || "Интересует сборка кастомного сервера.") +
          (formData.email ? `\nEmail: ${formData.email}` : ""),
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
        const msg = (data && "error" in data && data.error) || `HTTP ${r.status}`;
        throw new Error(msg);
      }

      if (data && data.ok) {
        console.log(`Lead created: ID=${data.leadId} ${data.leadUrl ?? ""}`);
        setStatus("success");
        setNotice("Заявка отправлена.");
        setFormData({
          name: "",
          email: "",
          countryCode: "+996",
          phone: "",
          message: "Интересует сборка кастомного сервера.",
        });
      } else if (data && !data.ok) {
        console.error("Bitrix24 error:", data.error, data.raw);
        setStatus("error");
        setNotice("Ошибка отправки. Попробуйте позже.");
      } else {
        setStatus("success");
        setNotice("Заявка отправлена.");
        setFormData({
          name: "",
          email: "",
          countryCode: "+996",
          phone: "",
          message: "Интересует сборка кастомного сервера.",
        });
      }
    } catch (err: unknown) {
      console.error("Network/API error:", isErrorLike(err) ? err.message : String(err));
      setStatus("error");
      setNotice("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative bg-[#010B14] py-20 px-6 md:px-12 font-mono text-white">
      <div className="relative z-10 max-w-7xl mx-auto border border-white/10 px-8 md:px-12 bg-[#02111e] backdrop-blur-sm shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
          <div className="space-y-6">
            <FaServer className="text-[#03CEA4] text-3xl" />
            <h2 className="text-2xl md:text-3xl font-semibold">Кастомные серверы</h2>
            <p className="text-white/80 leading-relaxed">
              Серверы, созданные в соответствии с конкретными требованиями
              заказчика, с индивидуальными конфигурациями аппаратного и
              программного обеспечения.
              <br />
              Свяжитесь с нами, чтобы мы собрали для вас кастомный сервер!
            </p>

            {status !== "idle" && (
              <div
                role="status"
                className={`mt-2 rounded-xl px-4 py-3 text-sm ${
                  status === "success"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                    : "bg-rose-500/15 text-rose-300 border border-rose-400/30"
                }`}
              >
                {notice}
              </div>
            )}
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

          <form className="flex flex-col gap-4 p-6 shadow-lg h-fit" onSubmit={handleSubmit} noValidate>
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
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                className="w-full bg-[#0e1d29] border border-white/10 px-4 py-3 text-sm placeholder-[#57616a] focus:outline-none focus:ring-2 focus:ring-[#03CEA4]"
              />
            </div>

        

            <div className="flex">
              <label className="sr-only" htmlFor="countryCode">
                Код страны
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className=" bg-[#0e1d29] border border-white/10 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#03CEA4]"
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
                className="w-full  bg-[#0e1d29] border border-white/10 px-4 py-3 text-sm placeholder-[#57616a] focus:outline-none focus:ring-2 focus:ring-[#03CEA4]"
              />
            </div>

            

            <Button
              size="lg"
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="mt-auto w-full py-3 text-[#010B14] font-semibold bg-gradient-to-r from-[#03CEA4] to-[#00FFC6] transition-transform hover:scale-105 disabled:opacity-60"
            >
              {loading ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
