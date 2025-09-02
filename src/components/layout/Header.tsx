import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

type SectionId = "home" | "tariffs" | "services" | "contact";

const HEADER_OFFSET = 10;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);

  const activeId = useMemo<SectionId | null>(() => {
    if (location.pathname === "/tariffs") return "tariffs";
    if (location.pathname === "/services") return "services";
    if (location.pathname === "/") {
      const h = (location.hash || "").replace("#", "") as SectionId;
      return (h || "home") as SectionId;
    }
    return null;
  }, [location.pathname, location.hash]);

  const goTo = (id: SectionId) => {
    switch (id) {
      case "home":
        if (!isHome) navigate("/");
        else scrollToId("home");
        break;
      case "tariffs":
        if (location.pathname !== "/tariffs") navigate("/tariffs");
        break;
      case "services":
        if (location.pathname !== "/services") navigate("/services");
        break;
      case "contact":
        if (isHome) scrollToId("contact");
        else navigate("/#contact");
        break;
    }
    setOpen(false);
  };

  // Автоскролл при переходе на главную с хэшемx
  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace("#", "");
      const t = window.setTimeout(() => scrollToId(id), 0);
      return () => window.clearTimeout(t);
    }
  }, [isHome, location.hash]);

  return (
    <header
      className={[
        "relative",
        "inset-x-0 top-0 z-50 border-b font-sans transition-colors duration-300",
        open
          ? "bg-white border-gray-200"
          : "bg-transparent backdrop-blur-[20px] border-white/10",
      ].join(" ")}
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 lg:py-6">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="На главную"
          onClick={(e) => {
            e.preventDefault();
            goTo("home");
          }}
        >
          <img src="/logo.svg" alt="ITSource Logo" className="h-9 w-auto" />
        </Link>

        {/* Десктопное меню */}
        <nav
          className={[
            "hidden md:flex items-center gap-8 text-sm transition-colors",
            open ? "text-gray-900" : "text-white",
          ].join(" ")}
        >
          <button
            onClick={() => goTo("home")}
            className={
              activeId === "home"
                ? "text-primary"
                : "text-white/90 hover:text-primary"
            }
          >
            Главная
          </button>
          <button
            onClick={() => goTo("tariffs")}
            className={
              activeId === "tariffs"
                ? "text-primary"
                : "text-white/90 hover:text-primary"
            }
          >
            Тарифы
          </button>
          <button
            onClick={() => goTo("services")}
            className={
              activeId === "services"
                ? "text-primary"
                : "text-white/90 hover:text-primary"
            }
          >
            Услуги
          </button>
          <button
            onClick={() => goTo("contact")}
            className={
              activeId === "contact"
                ? "text-primary"
                : "text-white/90 hover:text-primary"
            }
          >
            Контакты
          </button>

          <button
            onClick={() => goTo("contact")}
            className="ml-6 text-[#03CEA4] bg-[#03CEA426] py-2.5 px-6 font-semibold transition active:scale-95"
          >
            Связаться
          </button>
        </nav>

        {/* Бургер */}
        <button
          type="button"
          className={[
            "md:hidden inline-flex items-center justify-center p-2 transition active:scale-95 focus:outline-none",
            open ? "text-gray-900" : "text-white/90",
          ].join(" ")}
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full z-50 bg-white shadow-lg border-t border-gray-200 animate-fadeIn">
          <ul className="flex flex-col divide-y divide-gray-200">
            <li>
              <button
                onClick={() => goTo("home")}
                className={[
                  "w-full text-left px-6 py-4 hover:bg-gray-50 transition",
                  activeId === "home" ? "text-primary" : "text-gray-800",
                ].join(" ")}
              >
                Главная
              </button>
            </li>
            <li>
              <button
                onClick={() => goTo("tariffs")}
                className={[
                  "w-full text-left px-6 py-4 hover:bg-gray-50 transition",
                  activeId === "tariffs" ? "text-primary" : "text-gray-800",
                ].join(" ")}
              >
                Тарифы
              </button>
            </li>
            <li>
              <button
                onClick={() => goTo("services")}
                className={[
                  "w-full text-left px-6 py-4 hover:bg-gray-50 transition",
                  activeId === "services" ? "text-primary" : "text-gray-800",
                ].join(" ")}
              >
                Услуги
              </button>
            </li>
            <li>
              <button
                onClick={() => goTo("contact")}
                className={[
                  "w-full text-left px-6 py-4 hover:bg-gray-50 transition",
                  activeId === "contact" ? "text-primary" : "text-gray-800",
                ].join(" ")}
              >
                Контакты
              </button>
            </li>
          </ul>
          <div className="px-6 py-4 border-t border-gray-200">
            <button
              onClick={() => goTo("contact")}
              className="w-full text-[#03CEA4] bg-[#03CEA426] py-3 font-semibold transition active:scale-[0.99]"
            >
              Связаться
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
