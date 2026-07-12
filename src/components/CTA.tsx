import { useTranslation } from "react-i18next";
import { ReserveButton } from "./ReserveButton";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col justify-end -mx-6 md:-mx-12 lg:-mx-[50px] min-h-[500px] lg:min-h-[750px] px-6 py-16 lg:px-[177px] lg:pb-[90px] overflow-hidden">
      
      {/* 1. Background Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Fallback warna hitam saat gambar sedang di-load */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Gambar Latar */}
        <img 
          src="/assets/cta/cta-background.webp" 
          alt={t("cta.bgAlt")} 
          className="absolute inset-0 object-cover w-full h-full"
          loading="lazy"
        />
        
        {/* Overlay Gelap agar teks terbaca jelas (Contrast) */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 flex flex-col items-center mx-auto w-full max-w-[1274px] gap-8 md:gap-[50px]">
        
        {/* Heading Group */}
        <div className="flex flex-col items-center gap-4 md:gap-[20px] w-full max-w-[732px]">
          
          {/* Subheading dengan Ikon */}
          <div className="flex items-center justify-center gap-[10px]">
            <img 
              src="/assets/cta/bullet-icon.svg" 
              alt="" 
              className="w-[10px] h-[10px] shrink-0" 
              aria-hidden="true" 
            />
            <h3 className="font-sans font-medium text-primary text-sm md:text-[16px] tracking-[0.8px] uppercase">
              {t("cta.tag")}
            </h3>
          </div>

          {/* Main Heading (Responsive text size) */}
          <h2 className="font-sans font-medium text-3xl md:text-4xl lg:text-[48px] text-white text-center uppercase leading-tight md:leading-normal">
            {t("cta.title")}
          </h2>
        </div>

        {/* Paragraph (Responsive width & text size) */}
        <p className="font-sans font-normal text-base md:text-[20px] text-white text-center tracking-wide md:tracking-[1px] max-w-3xl leading-relaxed capitalize">
          {t("cta.description")}
        </p>

        {/* Call To Action Button */}
        <ReserveButton className="h-[58px] text-[18px]">
          {t("cta.buttonLabel") || t("common.reserve")}
        </ReserveButton>

      </div>
    </section>
  );
}
