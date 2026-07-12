import { cn } from "@/lib/utils";

interface AroundCardProps {
  imageSrc: string;
  title: string;
  className?: string;
}

export default function AroundCard({ imageSrc, title, className }: AroundCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-[6px] w-full max-w-[470px] h-[380px] md:h-[480px] lg:h-[559px] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
        className
      )}
    >
      {/* Background Image with Hover Zoom */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Translucent Glassmorphic Bottom Overlay */}
      <div className="relative z-10 w-full bg-white/20 backdrop-blur-md border-t border-white/10 px-6 py-5 md:pl-9 md:pr-10 md:py-7 transition-all duration-300 group-hover:bg-white/25">
        <h3 className="font-sans font-medium text-white text-lg md:text-[24px] uppercase tracking-[1.2px] leading-snug break-words">
          {title}
        </h3>
      </div>
    </div>
  );
}
