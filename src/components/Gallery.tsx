import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    // Use pageX directly
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="gallery"
      className="bg-bg-light -mx-6 md:-mx-12 lg:-mx-[50px] py-16 md:py-24 lg:py-[125px] flex flex-col items-center select-none overflow-hidden"
    >
      {/* Container Heading & CTA */}
      <div className="flex flex-col gap-6 lg:gap-[50px] items-center text-center w-full max-w-[1200px] px-6 mb-12 lg:mb-[110px] animate-rise-in">
        {/* Subheading Bullet */}
        <div className="flex gap-[10px] items-center justify-center">
          <img
            src="/assets/gallery/bullet-icon.svg"
            alt=""
            className="w-2.5 h-2.5 shrink-0"
            aria-hidden="true"
          />
          <span className="font-sans font-medium text-primary text-sm lg:text-[16px] tracking-[0.8px] uppercase">
            {t("gallery.tag")}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-sans font-medium text-3xl md:text-4xl lg:text-[48px] text-text-dark uppercase tracking-wide leading-tight">
          {t("gallery.title")}
        </h2>

        {/* Description */}
        <p className="font-sans font-light text-text-dark text-base md:text-lg lg:text-[24px] tracking-[1.2px] max-w-3xl leading-relaxed">
          {t("gallery.description")}
        </p>
      </div>

      {/* Gallery Scroll Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto scrollbar-none flex gap-6 lg:gap-[40px] items-center px-6 md:px-12 lg:px-[150px] pb-6 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        {/* Column 1: Image 1 */}
        <div className="w-[220px] h-[260px] md:w-[330px] md:h-[380px] lg:w-[504px] lg:h-[577px] shrink-0 overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
          <img
            alt={t("gallery.alt1")}
            className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
            src="/assets/gallery/gallery-1.webp"
            loading="lazy"
          />
        </div>

        {/* Column 2: Image 2 & 3 */}
        <div className="flex flex-col gap-4 lg:gap-[40px] w-[180px] md:w-[270px] lg:w-[408px] shrink-0">
          {/* Top image in column 2 */}
          <div className="h-[160px] md:h-[230px] lg:h-[354px] overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              alt={t("gallery.alt2")}
              className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              src="/assets/gallery/gallery-2.webp"
              loading="lazy"
            />
          </div>
          {/* Bottom image in column 2 */}
          <div className="h-[220px] md:h-[320px] lg:h-[489px] overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              alt={t("gallery.alt3")}
              className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              src="/assets/gallery/gallery-3.webp"
              loading="lazy"
            />
          </div>
        </div>

        {/* Column 3: Image 4 (Tall Pool Image - Center) */}
        <div className="w-[220px] h-[450px] md:w-[330px] md:h-[650px] lg:w-[504px] lg:h-[984px] shrink-0 overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
          <img
            alt={t("gallery.alt4")}
            className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
            src="/assets/gallery/gallery-4.webp"
            loading="lazy"
          />
        </div>

        {/* Column 4: Image 5 & 6 */}
        <div className="flex flex-col gap-4 lg:gap-[40px] w-[180px] md:w-[270px] lg:w-[408px] shrink-0">
          {/* Top image in column 4 */}
          <div className="h-[160px] md:h-[230px] lg:h-[354px] overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              alt={t("gallery.alt5")}
              className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              src="/assets/gallery/gallery-5.webp"
              loading="lazy"
            />
          </div>
          {/* Bottom image in column 4 */}
          <div className="h-[220px] md:h-[320px] lg:h-[489px] overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              alt={t("gallery.alt6")}
              className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
              src="/assets/gallery/gallery-6.webp"
              loading="lazy"
            />
          </div>
        </div>

        {/* Column 5: Image 7 */}
        <div className="w-[220px] h-[260px] md:w-[330px] md:h-[380px] lg:w-[504px] lg:h-[577px] shrink-0 overflow-hidden rounded-[12px] md:rounded-[20px] shadow-md hover:shadow-xl transition-shadow duration-300">
          <img
            alt={t("gallery.alt7")}
            className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
            src="/assets/gallery/gallery-7.webp"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
