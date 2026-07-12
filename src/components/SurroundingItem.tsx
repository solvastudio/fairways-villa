import { cn } from "@/lib/utils";

interface SurroundingItemProps {
  name: string;
  detail?: string;
  className?: string;
}

export default function SurroundingItem({ name, detail, className }: SurroundingItemProps) {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {/* Title & Bullet Row */}
      <div className="flex items-center gap-2.5 w-full">
        {/* CSS-Only Bullet Dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-accent-brown shrink-0" aria-hidden="true" />
        <h4 className="font-sans font-light text-text-dark text-base md:text-[20px] leading-tight capitalize">
          {name}
        </h4>
      </div>

      {/* Optional Distance/Duration Detail (Aligned under name text) */}
      {detail && (
        <div className="pl-5">
          <p className="font-sans font-medium text-accent-brown text-sm md:text-[16px] tracking-[0.8px] capitalize leading-normal">
            {detail}
          </p>
        </div>
      )}
    </div>
  );
}
