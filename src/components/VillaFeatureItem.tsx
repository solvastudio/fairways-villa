import React from "react";

interface VillaFeatureItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

export function VillaFeatureItem({ icon, text }: VillaFeatureItemProps) {
  return (
    <div className="flex flex-row items-center gap-4 md:gap-6 animate-fade-in select-none">
      <div className="w-6 h-6 md:w-[30px] md:h-[30px] shrink-0 flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="text-white text-base md:text-[20px] font-medium font-sans tracking-[1px] capitalize whitespace-nowrap">
        {text}
      </div>
    </div>
  );
}
