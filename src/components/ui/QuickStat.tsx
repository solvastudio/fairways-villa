import React from "react";

interface QuickStatProps {
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function QuickStat({ icon, content }: QuickStatProps) {
  return (
    <div className="flex gap-4 lg:gap-[25px] items-center select-none py-2 lg:py-0">
      <div className="text-primary shrink-0 w-[30px] h-[30px] flex items-center justify-center">
        {icon}
      </div>
      <div className="text-text-dark font-sans text-lg lg:text-[24px] font-normal tracking-[1.2px] leading-snug">
        {content}
      </div>
    </div>
  );
}
