import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 text-white/90 font-sans bg-black">
      <div className="mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16  ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">IT Source</h3>
              <p className="mt-2 text-sm text-white/70">
                Комплексные IT&nbsp;услуги
              </p>
            </div>

            <div className=" flex items-center gap-5">
              <SocialLink href="#" label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <FaFacebookF />
              </SocialLink>
              <SocialLink href="#" label="Instagram">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="#" label="Telegram">
                <FaTelegramPlane />
              </SocialLink>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold">Навигация</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <button
                  className="hover:text-primary transition-colors"
                  onClick={() => scrollToHash("home")}
                >
                  Главная
                </button>
              </li>
              <li>
                <button
                  className="hover:text-primary transition-colors"
                  onClick={() => scrollToHash("services")}
                >
                  Услуги
                </button>
              </li>
              <li>
                <button
                  className="hover:text-primary transition-colors"
                  onClick={() => scrollToHash("pricing")}
                >
                  Тарифы
                </button>
              </li>
              <li>
                <button
                  className="hover:text-primary transition-colors"
                  onClick={() => scrollToHash("contact")}
                >
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Услуги</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Аудит инфраструктуры</li>
              <li>Проектирование IT‑решений</li>
              <li>Внедрение систем &quot;под ключ&quot;</li>
              <li>Слаботочные системы</li>
              <li>Сетевые решения</li>
              <li>Серверные решения</li>
              <li>Поставка оборудования</li>
              <li>Аренда серверов</li>
              <li>Специальные и готовые решения</li>
              <li>Тех поддержка и SLA</li>
              <li>1C RDP</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Контакты</h4>
            <div className="mt-4 space-y-4 text-sm">
              <p>г. Бишкек, ул Бакаева 140/3</p>
              <div className="space-y-2">
                <p>
                  отдел продаж:{" "}
                  <a href="tel:+996555800013" className="hover:text-primary">
                    +996 555 800013
                  </a>
                </p>
                <p>
                  тех поддержка:{" "}
                  <a href="tel:+996999800013" className="hover:text-primary">
                    +996 999 800013
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <a
                    href="mailto:info@itsource.kg"
                    className="hover:text-primary underline-offset-4 hover:underline"
                  >
                    info@itsource.kg
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:sales@itsource.kg"
                    className="hover:text-primary underline-offset-4 hover:underline"
                  >
                    sales@itsource.kg
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:help@itsource.kg"
                    className="hover:text-primary underline-offset-4 hover:underline"
                  >
                    help@itsource.kg
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 lg:mt-14 border-t border-white/10 py-8 text-center text-xs text-white/60">
        © {year} – It Source
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/5 active:scale-95 transition"
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-lg">{children}</span>
    </a>
  );
}

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 10;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
}
