import React from "react";

interface DetailItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function DetailItem({ icon, title, subtitle }: DetailItemProps) {
  return (
    <div className="flex gap-4 lg:gap-[25px] items-start select-none">
      <div className="text-primary shrink-0 w-[30px] h-[30px] flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col leading-tight">
        <h4 className="text-text-dark font-sans text-lg lg:text-[20px] font-normal tracking-[1px] capitalize">
          {title}
        </h4>
        {subtitle && (
          <p className="text-text-dark/80 font-sans text-sm lg:text-[18px] font-light tracking-[0.8px] mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
