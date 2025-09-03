import { useEffect, Fragment } from "react";
import type { Project } from "../../../app/data/Projects";
import { FaCircleCheck } from "react-icons/fa6";

export type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function PanelCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/95 text-black max-w-xl rounded-2xl border border-black/10 p-4 md:p-5 shadow-sm ${className}`}
    >
      <div className="font-mono font-semibold mb-2 md:mb-3 text-xl md:text-3xl">
        {title}
      </div>
      <div className="text-sm md:text-[16px] leading-relaxed">{children}</div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;

  const taskText = project.details?.blocks?.task?.text;
  const resultText = project.details?.blocks?.result?.text;
  const challengesItems = project.details?.blocks?.challenges?.items ?? [];
  const hasChallenges = challengesItems.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#001B32]/95 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Клик по подложке закрывает модалку */}
      <button
        aria-label="Закрыть модалку"
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 md:px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {/* Шапка + кнопка закрытия */}
        <div className="relative">
          <h3
            id="project-modal-title"
            className="font-mono text-white font-bold text-[24px] leading-tight md:text-5xl md:leading-[1.1] pr-14 mb-4 md:mb-8"
          >
            {project.details?.heading || project.title}
          </h3>

          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-0 top-0 md:right-1 md:top-1 rounded-xl bg-black/55 hover:bg-black/70 text-white px-3 py-2 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] gap-4 md:gap-6">
          {/* Левая колонка (контент) */}
          <div>
            {hasChallenges ? (
              <Fragment>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <PanelCard title="Задача">{taskText}</PanelCard>

                  <PanelCard title="Ключевые вызовы">
                    <ul className="list-disc pl-5 space-y-1.5">
                      {challengesItems.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </PanelCard>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="bg-transparent">
                    <div className="text-white text-[20px] md:text-[26px] font-semibold mb-3">
                      Реализованные решения
                    </div>
                    <ul className="space-y-4 md:space-y-6">
                      {(project.details?.solutions ?? []).map((group, idx) => (
                        <li key={idx} className="text-white">
                          <div className="flex items-start gap-3">
                            <span className="mt-1 shrink-0">
                              <FaCircleCheck
                                aria-hidden
                                className="h-5 w-5 md:h-6 md:w-6 text-white"
                              />
                            </span>
                            <div>
                              <div className="font-semibold text-[18px] md:text-[22px]">
                                {group.title}
                              </div>
                              <div className="mt-1 text-white/90 text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                                {group.items.join("\n")}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <PanelCard className="h-fit" title="Результат">
                    {resultText}
                  </PanelCard>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="flex flex-col md:flex-row md:gap-5">
                  <div className="grid grid-cols-1 gap-4 md:gap-5 flex-1">
                    <PanelCard title="Задача">{taskText}</PanelCard>
                    <PanelCard title="Результат">{resultText}</PanelCard>
                  </div>

                  {(project.details?.solutions?.length ?? 0) > 0 && (
                    <div className="mt-6 md:mt-0 md:flex-1">
                      <div className="text-white text-[20px] md:text-[26px] font-semibold mb-3">
                        Реализованные решения
                      </div>
                      <ul className="space-y-4 md:space-y-6">
                        {project.details!.solutions!.map((group, idx) => (
                          <li key={idx} className="text-white">
                            <div className="flex items-start gap-3">
                              <span className="mt-1 shrink-0">
                                <FaCircleCheck
                                  aria-hidden
                                  className="h-5 w-5 md:h-6 md:w-6 text-white"
                                />
                              </span>
                              <div>
                                <div className="font-semibold text-[18px] md:text-[22px]">
                                  {group.title}
                                </div>
                                <div className="mt-1 text-white/90 text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                                  {group.items.join("\n")}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Fragment>
            )}
          </div>

          <div className="relative">
            {(project.details?.heroImage ||
              project.modalImage ||
              project.image) && (
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                <img
                  src={
                    project.details?.heroImage ||
                    project.modalImage ||
                    project.image
                  }
                  alt={project.title}
                  className="w-full h-auto max-h-[280px] md:max-h-none object-cover"
                />
              </div>
            )}

            {project.details?.logo && (
              <div className="mt-4 md:mt-5">
                <img
                  src={project.details.logo}
                  alt="Логотип"
                  className="object-contain opacity-95 w-full max-w-[380px] h-[140px] md:h-[180px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
