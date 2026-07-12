import { useTranslation, Trans } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <section
      id="about-us"
      className="bg-bg-light -mx-6 md:-mx-12 lg:mx-[-50px] px-6 py-20 md:px-12 lg:px-24 lg:py-48 flex justify-center"
    >
      <div className="max-w-[1440px] w-full flex flex-col lg:flex-row gap-12 lg:gap-36 items-start">
        {/* Kolom Kiri */}
        <div className="flex flex-col items-start w-full lg:w-3/5">
          {/* Label "ABOUT US" */}
          <div className="flex items-center gap-2.5 mb-6 lg:mb-10">
            <img src="/assets/about-us/ellipse.svg" className="w-2.5 h-2.5" alt="" aria-hidden="true" />
            <span className="font-sans font-medium text-accent-brown text-sm lg:text-base tracking-[0.8px] uppercase">
              {t("about.tag")}
            </span>
          </div>

          {/* Typography Heading Campuran */}
          <h2 className="text-text-dark leading-[1.2] lg:leading-[1.1] font-sans font-medium text-4xl lg:text-[64px] tracking-normal">
            <Trans
              t={t}
              i18nKey="about.heading"
              components={{
                italic: <span className="font-cormorant font-medium italic lowercase text-5xl lg:text-[96px] tracking-normal" />,
                br: <br className="hidden lg:block" />
              }}
            />
          </h2>
        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-8 lg:gap-10 w-full lg:w-2/5 lg:pt-16">
          {/* Paragraf Deskripsi */}
          <p className="font-sans font-normal text-text-dark text-base lg:text-[20px] tracking-[1px] leading-relaxed">
            {t("about.description")}
          </p>

          {/* Garis Pemisah (Divider) */}
          <div className="w-full">
            <img src="/assets/about-us/line.svg" className="w-full h-px block" alt="" aria-hidden="true" />
          </div>

          {/* Alamat & Pin Lokasi */}
          <div className="flex items-start lg:items-center gap-4 lg:gap-6">
            <img src="/assets/about-us/location-pin.svg" className="w-[25px] h-[30px] lg:w-[30px] lg:h-[36px] shrink-0" alt={t("about.locationPinAlt")} />
            <address className="not-italic font-sans font-light text-text-dark text-sm lg:text-[20px] tracking-[1px] leading-relaxed">
              {t("about.address")}
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
