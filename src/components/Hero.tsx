import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import heroBg from "../assets/hero-bg.webp";
import scrollDownIcon from "../assets/scroll-down.svg";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScrollDown = () => {
    const element = document.getElementById("about-us");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[100dvh] -mx-6 md:-mx-12 lg:-mx-[50px] overflow-hidden select-none bg-bg-light">
      {/* Background Image with mounting zoom effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt={t("hero.bgAlt")}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
            isMounted ? "scale-100" : "scale-105"
          }`}
          loading="eager"
        />
        {/* Subtle dark gradient overlay to ensure header legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </div>

      {/* Glow Effect */}
      <div
        className="absolute top-[30%] -left-10 w-[80%] md:w-[1868px] h-[324px] bg-[rgba(242,200,107,0.16)] blur-[50px] pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Visually hidden H1 for SEO */}
      <h1 className="sr-only">Fairways Villa Belek - Luxury Holiday Rental in Antalya, Turkey</h1>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleScrollDown}
          className="group focus:outline-none transition-all duration-300 hover:translate-y-1 active:scale-95 flex flex-col items-center gap-2"
          aria-label={t("hero.scrollLabel")}
        >
          <img
            src={scrollDownIcon}
            alt="Scroll Down"
            className="w-[60px] h-[26px] md:w-[80px] md:h-[35px] opacity-80 hover:opacity-100 transition-opacity duration-300 animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </button>
      </div>
    </section>
  );
}
