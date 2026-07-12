import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import villaDetailHeroBg from "../assets/villa-detail-hero.webp";

export default function VillaDetailHero() {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-[45svh] md:h-[55svh] lg:h-[623px] -mx-6 md:-mx-12 lg:-mx-[50px] overflow-hidden select-none bg-bg-light">
      {/* Background Image with mounting zoom effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={villaDetailHeroBg}
          alt={t("villa.bgAlt")}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
            isMounted ? "scale-100" : "scale-105"
          }`}
          loading="eager"
        />
        {/* Dark overlay matching Figma (rgba(0,0,0,0.41)) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Glow Effect */}
      <div
        className="absolute top-[30%] -left-10 w-[80%] md:w-[1868px] h-[324px] bg-[rgba(242,200,107,0.16)] blur-[50px] pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Hero Title Section */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end items-center pb-12 md:pb-16 lg:pb-[58px] px-6">
        <h1 className="text-[#fdfffc] font-cormorant font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[96px] uppercase tracking-wider text-center leading-none max-w-4xl">
          {t("villa.detailTitle")}
        </h1>
      </div>
    </section>
  );
}
