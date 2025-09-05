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
  const isHome = location.pathname === "/itsource/public/";
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
        if (!isHome) navigate("/itsource/public/");
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

  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace("#", "");
      const t = window.setTimeout(() => scrollToId(id), 0);
      return () => window.clearTimeout(t);
    }
  }, [isHome, location.hash]);

  const navBase =
    "relative pb-2 transition-colors duration-200 text-white/90 hover:text-white";
  const navActive =
    "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#1cb898]";

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
          <img src={`${import.meta.env.BASE_URL}assets/logo.svg`} alt="ITSource Logo" className="h-9 w-auto" />
        </Link>
        <nav
          className={[
            "hidden md:flex items-center gap-8 text-sm transition-colors",
            open ? "text-gray-900" : "text-white",
          ].join(" ")}
        >
          <button
            onClick={() => goTo("home")}
            className={[navBase, activeId === "home" ? navActive : ""].join(" ")}
          >
            Главная
          </button>
          <button
            onClick={() => goTo("tariffs")}
            className={[navBase, activeId === "tariffs" ? navActive : ""].join(" ")}
          >
            Тарифы
          </button>
          <button
            onClick={() => goTo("services")}
            className={[navBase, activeId === "services" ? navActive : ""].join(" ")}
          >
            Услуги
          </button>
          <button
            onClick={() => goTo("contact")}
            className={[navBase, activeId === "contact" ? navActive : ""].join(" ")}
          >
            Контакты
          </button>

          <button
            onClick={() => goTo("contact")}
            className="ml-6 text-[#03CEA4] bg-[#03CEA426] py-2.5 px-6 font-semibold transition active:scale-95 rounded"
          >
            Связаться
          </button>
        </nav>
        <button
          type="button"
          className={[
            "md:hidden inline-flex items-center justify-center p-2 transition active:scale-95 focus:outline-none",
            open ? "text-gray-900" : "text-white/90",
          ].join(" ")}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={[
          "md:hidden absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-lg",
          open
            ? "animate-slideDown pointer-events-auto opacity-100"
            : "hidden opacity-0",
        ].join(" ")}
      >
        <ul className="flex flex-col divide-y divide-gray-200">
          <li>
            <button
              onClick={() => goTo("home")}
              className={[
                "w-full text-left px-6 py-4 hover:bg-gray-50 transition relative",
                activeId === "home"
                  ? "after:absolute after:left-6 after:right-6 after:bottom-0 after:h-[2px] after:bg-[#1cb898] text-gray-900"
                  : "text-gray-800",
              ].join(" ")}
            >
              Главная
            </button>
          </li>
          <li>
            <button
              onClick={() => goTo("tariffs")}
              className={[
                "w-full text-left px-6 py-4 hover:bg-gray-50 transition relative",
                activeId === "tariffs"
                  ? "after:absolute after:left-6 after:right-6 after:bottom-0 after:h-[2px] after:bg-[#1cb898] text-gray-900"
                  : "text-gray-800",
              ].join(" ")}
            >
              Тарифы
            </button>
          </li>
          <li>
            <button
              onClick={() => goTo("services")}
              className={[
                "w-full text-left px-6 py-4 hover:bg-gray-50 transition relative",
                activeId === "services"
                  ? "after:absolute after:left-6 after:right-6 after:bottom-0 after:h-[2px] after:bg-[#1cb898] text-gray-900"
                  : "text-gray-800",
              ].join(" ")}
            >
              Услуги
            </button>
          </li>
          <li>
            <button
              onClick={() => goTo("contact")}
              className={[
                "w-full text-left px-6 py-4 hover:bg-gray-50 transition relative",
                activeId === "contact"
                  ? "after:absolute after:left-6 after:right-6 after:bottom-0 after:h-[2px] after:bg-[#1cb898] text-gray-900"
                  : "text-gray-800",
              ].join(" ")}
            >
              Контакты
            </button>
          </li>
        </ul>
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => goTo("contact")}
            className="w-full text-[#03CEA4] bg-[#03CEA426] py-3 font-semibold transition active:scale-[0.99] rounded"
          >
            Связаться
          </button>
        </div>
      </div>
    </header>
  );
}
