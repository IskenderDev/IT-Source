import React from "react";

interface SectionTitleProps {
  heading: string;
  subheading?: string;
  className?: string;
}

export function SectionTitle({ heading, subheading, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center text-[#D9D9D9] flex items-center justify-center flex-col gap-6 ${className}`}>
      <div className="inline-flex items-center rounded-full px-14 md:py-2 text-2xl md:text-5xl bg-[#03CEA433]">
        {heading}
      </div>
      {subheading && (
        <p className="text-[15px] md:text-[24px] max-w-72 md:max-w-[1000px] font-light">
          {subheading}
        </p>
      )}
    </div>
  );
}

