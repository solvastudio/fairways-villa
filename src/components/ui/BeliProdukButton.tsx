import { cn } from "@/lib/utils";

interface BeliProdukButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "desktop" | "mobile";
}

export function BeliProdukButton({ variant = "desktop", className, ...props }: BeliProdukButtonProps) {
  const isDesktop = variant === "desktop";
  
  return (
    <button
      className={cn(
        "border-2 border-brand-dark border-solid flex items-center justify-center cursor-pointer transition-all duration-300 group font-sans uppercase tracking-wider",
        isDesktop
          ? "whitespace-nowrap gap-[8px] h-[60px] pl-[28px] pr-[24px] py-[14px] relative rounded-[30px] shadow-[0px_2px_6px_0px_rgba(181,132,174,0.08),0px_6px_16px_0px_rgba(181,132,174,0.12)] shrink-0 w-[188px] font-medium text-brand-dark text-[16px] hover:bg-brand-dark hover:text-brand-bg"
          : "gap-2 h-12 px-6 rounded-full shadow-md font-semibold text-brand-dark text-sm hover:bg-brand-dark hover:text-white",
        className
      )}
      {...props}
    >
      beli produk
      <img
        src="/products/vector-arrow.svg"
        alt="arrow"
        className={cn(
          "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:invert",
          isDesktop ? "h-[16px] w-[16px] rotate-45" : "h-4 w-4"
        )}
      />
    </button>
  );
}
