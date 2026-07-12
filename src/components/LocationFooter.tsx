import React from "react";
import { useTranslation } from "react-i18next";

export default function LocationFooter() {
  const { t } = useTranslation();
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(to.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      id="location"
      className="bg-bg-light text-[#1b2a41] py-16 md:py-24 lg:py-[125px] px-6 md:px-12 lg:px-[50px] -mx-6 md:-mx-12 lg:-mx-[50px] flex flex-col items-center select-none"
    >
      <div className="w-full max-w-[1622px] flex flex-col gap-16 md:gap-24 lg:gap-[136px]">
        {/* TAHAP 1: PETA DAN INFO LOKASI / KONTAK */}
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          {/* Peta Lokasi */}
          <div className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[708px] overflow-hidden rounded-[6px] shadow-sm relative">
            <iframe
              src="https://maps.google.com/maps?q=Kadriye,%2007525%20Serik/Antalya,%20T%C3%BCrkiye%20V29H%2B7H%20Serik,%20Antalya,%20T%C3%BCrkiye&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Fairways Villa Location"
              className="w-full h-full rounded-[6px]"
            />
          </div>

          {/* Kontak & Detail Alamat */}
          <div className="flex flex-col sm:flex-row justify-end gap-8 md:gap-[111px] w-full text-left">
            {/* Kolom Kontak */}
            <div className="flex flex-col gap-3 md:gap-[20px] w-full sm:w-[220px]">
              <h4 className="font-sans font-light tracking-[3.2px] text-xs md:text-sm uppercase text-[#1b2a41]/70">
                {t("footer.contactUs")}
              </h4>
              <div className="flex gap-2.5 items-center">
                <img
                  src="/assets/footer/icon-phone.png"
                  alt=""
                  className="w-5 h-5 shrink-0 object-contain"
                  aria-hidden="true"
                />
                <a
                  href="tel:+905378435048"
                  className="font-sans font-light text-base md:text-[20px] tracking-[1px] text-[#1b2a41] hover:text-primary transition-colors"
                >
                  +90 537 843 5048
                </a>
              </div>
            </div>

            {/* Kolom Alamat */}
            <div className="flex flex-col gap-3 md:gap-[20px] w-full sm:w-[408px]">
              <h4 className="font-sans font-light tracking-[3.2px] text-xs md:text-sm uppercase text-[#1b2a41]/70">
                {t("footer.location")}
              </h4>
              <div className="flex gap-2.5 items-start">
                <img
                  src="/assets/footer/icon-marker.png"
                  alt=""
                  className="w-5 h-5 mt-1 shrink-0 object-contain"
                  aria-hidden="true"
                />
                <address className="not-italic font-sans font-light text-base md:text-[20px] tracking-[1px] leading-relaxed text-[#1b2a41]">
                  {t("footer.address")}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* TAHAP 2: BRANDING LOGO, MENU DAN COPYRIGHT */}
        <div className="flex flex-col gap-12 md:gap-[100px] items-center w-full">
          {/* Logo Footer */}
          <div className="flex flex-col gap-3.5 items-center text-center">
            <img
              src="/assets/footer/logo-footer.svg"
              alt="Fairways Villa Logo"
              className="w-[50px] h-[50px] object-contain"
              loading="lazy"
            />
            <div className="flex flex-col uppercase items-center text-text-dark">
              <span className="font-cormorant font-medium text-3xl md:text-[36px] tracking-[3.6px]">
                {t("footer.logoTitle")}
              </span>
              <span className="font-montserrat font-medium text-xs md:text-[14px] tracking-[2.8px] mt-1">
                {t("footer.logoSubtitle")}
              </span>
            </div>
          </div>

          {/* Menu Navigasi Footer */}
          <nav className="w-full flex justify-center">
            <ul className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-12 lg:gap-x-[80px] gap-y-4 font-sans font-light text-sm md:text-lg lg:text-[20px] uppercase text-[#1b2a41]">
              <li>
                <a
                  href="#about-us"
                  onClick={(e) => handleScroll(e, "#about-us")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.about")}
                </a>
              </li>
              <li>
                <a
                  href="#villa"
                  onClick={(e) => handleScroll(e, "#villa")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.accommodation")}
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => handleScroll(e, "#location")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.contactUs")}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleScroll(e, "#gallery")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.gallery")}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleScroll(e, "#gallery")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.celebrations")}
                </a>
              </li>
              <li>
                <a
                  href="#neighbourhood"
                  onClick={(e) => handleScroll(e, "#neighbourhood")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.experiences")}
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => handleScroll(e, "#location")}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("navigation.location")}
                </a>
              </li>
            </ul>
          </nav>

          {/* Copyright & Divider */}
          <div className="w-full flex flex-col gap-6 md:gap-[25px]">
            <hr className="border-t border-[#1b2a41]/10 w-full" />
            <p className="font-sans font-normal text-sm md:text-[20px] tracking-widest text-[#1b2a41]/40 uppercase text-center md:text-left">
              {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
