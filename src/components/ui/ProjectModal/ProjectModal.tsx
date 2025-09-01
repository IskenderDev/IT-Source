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
    <div className={`bg-white text-black max-w-xl  p-4 md:p-5 ${className}`}>
      <div className="font-mono font-semibold mb-2 md:mb-3 text-2xl md:text-4xl">
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
    <div className="fixed inset-0 z-50 bg-[#001B32] flex items-center">
      <button
        aria-label="Закрыть модалку"
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 md:px-1 py-6 md:py-8">
        <h3
          id="project-modal-title"
          className="font-mono text-white font-bold text-[28px] md:text-6xl mb-5 md:mb-8 "
        >
          {project.details?.heading || project.title}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] gap-5 md:gap-6">
          <div>
            {hasChallenges ? (
              <Fragment>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <PanelCard title="Задача">{taskText}</PanelCard>

                  <PanelCard title="Ключевые вызовы">
                    <div className="list-disc pl-5 space-y-1">
                      {challengesItems.map((c) => (
                        <p>{c}</p>
                      ))}
                    </div>
                  </PanelCard>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="bg-transparent">
                    <div className="text-white text-[22px] md:text-[26px] font-semibold mb-3">
                      Реализованные решения
                    </div>
                    <ul className="space-y-6">
                      {(project.details?.solutions ?? []).map((group, idx) => (
                        <li key={idx} className="text-white">
                          <div className="flex items-start gap-3">
                            <span className="mt-1 shrink-0">
                              <FaCircleCheck
                                aria-hidden
                                className="h-6 w-6 text-white"
                              />
                            </span>
                            <div>
                              <div className="font-semibold text-[20px] md:text-[22px]">
                                {group.title}
                              </div>
                              <div className="mt-1 text-white text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                                {group.items.join("\n")}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <PanelCard className="h-fit" title="Результат">{resultText}</PanelCard>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="flex gap-5">
                  <div className="grid grid-cols-1 gap-4 md:gap-5">
                    <PanelCard title="Задача">{taskText}</PanelCard>
                    <PanelCard title="Результат">{resultText}</PanelCard>
                  </div>

                  {(project.details?.solutions?.length ?? 0) > 0 && (
                    <div className="mt-6">
                      <div className="text-white text-[22px] md:text-[26px] font-semibold mb-3">
                        Реализованные решения
                      </div>
                      <ul className="space-y-6">
                        {project.details!.solutions!.map((group, idx) => (
                          <li key={idx} className="text-white">
                            <div className="flex items-start gap-3">
                              <span className="mt-1 shrink-0">
                                <FaCircleCheck
                                  aria-hidden
                                  className="h-6 w-6 text-white"
                                />
                              </span>
                              <div>
                                <div className="font-semibold text-[20px] md:text-[22px]">
                                  {group.title}
                                </div>
                                <div className="mt-1 text-white/85 text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
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
              <div className="relative overflow-hidden">
                <img
                  src={
                    project.details?.heroImage ||
                    project.modalImage ||
                    project.image
                  }
                  alt={project.title}
                  className="w-[400px] object-cover"
                />
              </div>
            )}

            {project.details?.logo && (
              <div className="mt-5">
                <img
                  src={project.details.logo}
                  alt="Логотип"
                  className="object-contain opacity-95 w-[300px] h-[180px] md:w-[380px]"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 md:right-4 md:top-4 rounded-xl bg-black/55 hover:bg-black/70 text-white px-3 py-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
