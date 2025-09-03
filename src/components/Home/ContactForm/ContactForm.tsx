import { useState } from "react";
import { Button } from "../../ui";

type Status = "idle" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setNotice("");

    try {
      const body = {
        ...formData,
        page: window.location.href,
        utm: Object.fromEntries(new URLSearchParams(window.location.search)),
      };

      const r = await fetch("/api/b24-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();

      if (data?.ok) {
        console.log(`Lead created: ID=${data.leadId} ${data.leadUrl ?? ""}`);
        setStatus("success");
        setNotice(`Заявка отправлена. №${data.leadId}`);
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Bitrix24 error:", data?.error || data);
        setStatus("error");
        setNotice("Ошибка отправки. Попробуйте позже.");
      }
    } catch (err: any) {
      console.error("Network/API error:", err?.message || err);
      setStatus("error");
      setNotice("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative bg-transparent py-20 flex items-center justify-center overflow-hidden px-3">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-2xl w-full bg-[#010C15]/50 backdrop-blur-3xl rounded-2xl border border-white/20 p-8 md:p-10 shadow-lg text-white"
      >
        <div aria-hidden className="pointer-events-none absolute -left-20 w-[200px] h-[100px] bg-[#B353FF] rounded-full opacity-50 blur-[140px]" />

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
          <input
            name="name"
            type="text"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none"
          />
        </div>

        <textarea
          name="message"
          placeholder="Что еще вас интересует?"
          value={formData.message}
          onChange={handleChange}
          className="relative z-10 mt-4 w-full min-h-[140px] md:min-h-[180px] rounded-xl bg-[#1F2733]/80 text-white placeholder:text-white/50 px-6 py-4 focus:outline-none resize-none"
        />

        <div className="relative z-10 pt-3 flex flex-col items-center space-y-2">
          <Button size="md" className="transition-shadow hover:shadow-[0_0_20px_#03CEA4]" disabled={loading}>
            {loading ? "Отправка..." : "Отправить"}
          </Button>
        </div>

        <div aria-hidden className="pointer-events-none absolute bottom-20 -right-20 w-[200px] h-[75px] bg-[#03CEA4] rounded-full opacity-50 blur-[140px]" />
      </form>
    </section>
  );
}
