import { useEffect, useState } from "react";
import { Button, SectionTitle } from "../../ui";
import { DEFAULT_SOLUTIONS, type Solution } from "../../../app/data/readySolutions";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  solution?: Solution | null;
};

function SolutionModal({ open, onClose, solution }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !solution) return null;

  const imgSrc = solution.modalImage || solution.image;
  const contactHref = solution.contactHref || "/#contact";

  return (
    <div
      className="fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl rounded-2xl bg-[#010925] text-white shadow-2xl ring-1 ring-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:bg-white/70 transition"
        >
          ✕
        </button>

        <img
          src={imgSrc}
          alt={solution.title}
          className="w-full h-auto object-contain"
          loading="eager"
        />

        <div className="p-6 flex justify-center ">
          <Button
            size="lg"
            className="rounded-full px-8 py-3 bg-emerald-400 text-black hover:bg-emerald-300 transition"
            href={contactHref}
          >
            Связаться с нами
          </Button>
        </div>
      </div>
    </div>
  );
}

type Props = { solutions?: Solution[] };

const ReadySolutions = ({ solutions = DEFAULT_SOLUTIONS }: Props) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Solution | null>(null);

  const openModal = (s: Solution) => {
    setActive(s);
    setOpen(true);
  };

  return (
    <section className="w-full py-20 font-sans">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionTitle
          heading="Готовые отраслевые решения"
          subheading="Типовые решения для различных сфер бизнеса"
          className="mb-24"
        />

        <ul className="mt-8 md:mt-12 space-y-8 flex flex-col gap-14">
          {solutions.map((s) => (
            <li
              key={s.id}
              className="grid grid-cols-1 md:grid-cols-[520px_1fr] gap-5 md:gap-8 items-stretch"
            >
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-60 md:h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-3xl font-semibold text-white">
                    {s.title}
                  </h3>
                  <ul className="mt-3 md:mt-4 space-y-1.5 text-white text-xl md:text-sm leading-relaxed">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => openModal(s)}
                    className="rounded-full px-6 py-2 bg-emerald-400 text-black hover:bg-emerald-300 transition"
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <SolutionModal
        open={open}
        onClose={() => setOpen(false)}
        solution={active}
      />
    </section>
  );
};

export default ReadySolutions;
