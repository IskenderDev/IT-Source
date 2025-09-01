import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { HEADER_LINKS, type SectionId } from "../../app/data/header";

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
  const panelRef = useRef<HTMLDivElement>(null);

  const activeId = useMemo<SectionId | null>(() => {
    const h = (location.hash || "").replace("#", "");
    return (HEADER_LINKS.find((l) => l.id === h)?.id as SectionId) ?? null;
  }, [location.hash]);

  const goTo = (id: SectionId) => {
    if (isHome) {
      scrollToId(id);
    } else {
      navigate(`/#${id}`);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="inset-x-0 top-0 z-50 bg-transparent backdrop-blur-[20px] border-b border-white/10 font-sans">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 lg:py-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="На главную">
          <img src="/logo.svg" alt="ITSource Logo" className="h-11 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white">
          <ul className="hidden md:flex items-center gap-8">
            {HEADER_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goTo(link.id)}
                  className={[
                    "transition-colors",
                    "hover:text-primary",
                    activeId === link.id ? "text-primary" : "text-white/90",
                  ].join(" ")}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => goTo("contact")}
            className="ml-10  text-[#03CEA4] bg-[#03CEA426] py-3 px-6 font-semibold transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03CEA4]/60"
          >
            Связаться
          </button>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-white/90 transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Меню"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-5 w-6">
            <span
              className={[
                "absolute left-0 top-0 h-[2px] w-6 bg-white transition-transform duration-300",
                open ? "translate-y-[10px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[9px] h-[2px] w-6 bg-white transition-opacity duration-300",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 bottom-0 h-[2px] w-6 bg-white transition-transform duration-300",
                open ? "-translate-y-[10px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      <div
        className={[
          "md:hidden",
          "fixed inset-0 z-40",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          className={[
            "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        <div
          id="mobile-menu"
          ref={panelRef}
          className={[
            "absolute right-0 top-0 h-full w-[78%] max-w-[340px]",
            "bg-[#0B1622]/95 backdrop-blur-xl border-l border-white/10",
            "transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
            "px-6 pb-10 pt-24",
          ].join(" ")}
        >
          <ul className="space-y-2">
            {HEADER_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goTo(link.id)}
                  className={[
                    "w-full text-left rounded-xl px-4 py-3",
                    "text-white/90 hover:text-white",
                    "hover:bg-white/5 active:bg-white/10",
                    "transition",
                    activeId === link.id ? "text-primary bg-white/5" : "",
                  ].join(" ")}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-6">
            <button
              onClick={() => goTo("contact")}
              className="w-full text-[#03CEA4] bg-[#03CEA426] py-3.5 px-6 font-semibold transition active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03CEA4]/60"
            >
              Связаться
            </button>
          </div>

          <p className="mt-6 text-xs text-white/50">
            © {new Date().getFullYear()} ITSource
          </p>
        </div>
      </div>
    </header>
  );
}
