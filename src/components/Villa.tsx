import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { VillaFeatureItem } from "./VillaFeatureItem";
import { OutlineButton } from "./OutlineButton";

export default function Villa() {
  const { t } = useTranslation();

  return (
    <section id="villa" className="relative min-h-dvh -mx-6 md:-mx-12 lg:mx-[-50px] flex flex-col items-center justify-end pb-[90px] pt-20 px-4 md:px-8 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/villa/hero-bg.webp"
          alt={t("villa.bgAlt")}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Figma Overlay (0.72 opacity) */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.72)]" />
      </div>

      {/* Villa Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-[38px] max-w-[900px] w-full text-center">
        {/* Title */}
        <h2 className="text-white font-cormorant font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[96px] uppercase tracking-wide leading-tight select-none">
          {t("villa.title")}
        </h2>

        {/* Villa Features */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-[91px] w-full">
          <VillaFeatureItem
            icon={<img src="/assets/villa/bed.svg" alt="Bed" className="w-full h-full" />}
            text={t("villa.bedrooms")}
          />
          <VillaFeatureItem
            icon={<img src="/assets/villa/bath.svg" alt="Bath" className="w-full h-full" />}
            text={t("villa.bathrooms")}
          />
        </div>

        {/* CTA Button */}
        <div>
          <Link to="/villa">
            <OutlineButton>
              {t("common.viewDetail")}
            </OutlineButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
