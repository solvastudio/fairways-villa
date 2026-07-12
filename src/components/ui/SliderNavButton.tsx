import { cn } from "@/lib/utils";

interface SliderNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
  icon?: string;
  iconClassName?: string;
}

export function SliderNavButton({
  direction,
  icon,
  iconClassName,
  disabled,
  className,
  ...props
}: SliderNavButtonProps) {
  const isLeft = direction === "left";

  return (
    <button
      disabled={disabled}
      className={cn(
        "rounded-full flex items-center justify-center transition-all border border-border/10 bg-white shadow-sm cursor-pointer",
        "w-[45px] h-[45px] md:w-[60px] md:h-[60px]",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-primary hover:border-primary active:scale-95 group",
        className
      )}
      aria-label={isLeft ? "Previous Slide" : "Next Slide"}
      {...props}
    >
      {icon ? (
        <img
          src={icon}
          alt={isLeft ? "prev" : "next"}
          className={cn(
            "w-6 h-6 md:w-8 md:h-8 transition-all",
            !isLeft && "rotate-180",
            !disabled && "group-hover:brightness-0 group-hover:invert",
            iconClassName
          )}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={cn(
            "w-5 h-5 transition-all",
            isLeft ? "rotate-90" : "-rotate-90",
            iconClassName
          )}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      )}
    </button>
  );
}
