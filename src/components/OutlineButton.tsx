import React from "react";

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function OutlineButton({
  children,
  className = "",
  ...props
}: OutlineButtonProps) {
  return (
    <button
      {...props}
      className={`border border-bg-light flex items-center justify-center px-6 py-3 md:px-[40px] md:py-[20px] rounded-[1px] hover:bg-bg-light text-white hover:text-black transition-all duration-300 cursor-pointer active:scale-95 ${className}`}
    >
      <span className="font-sans font-semibold text-sm md:text-[16px] tracking-[1.6px] uppercase ">
        {children}
      </span>
    </button>
  );
}
