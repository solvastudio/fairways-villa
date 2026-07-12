import { useRef, useState, useEffect } from "react";
import quoteWhite from "../assets/testimoni/quote-white.webp";
import stuartAvatar from "../assets/testimoni/stuart.webp";
import quoteDark from "../assets/testimoni/quote-dark.webp";
import impramAvatar from "../assets/testimoni/impram.webp";
import arrowLeft from "../assets/testimoni/arrow-left.svg";
import arrowRight from "../assets/testimoni/arrow-right.svg";
import { useTranslation } from "react-i18next";
import { SliderNavButton } from "./ui/SliderNavButton";

interface TestimonialData {
  id: string;
  quoteIcon: string;
  text: string;
  avatar: string;
  name: string;
  country: string;
  isDark: boolean;
}

interface TestimonialJSON {
  id: string;
  text: string;
  name: string;
  country: string;
}

export default function Testimoni() {
  const { t } = useTranslation();

  const testimonialTranslations = t("testimoni.reviews", { returnObjects: true }) as TestimonialJSON[];

  const testimonials: TestimonialData[] = testimonialTranslations.map((item) => {
    const isStuart = item.id === "stuart";
    return {
      id: item.id,
      quoteIcon: isStuart ? quoteWhite : quoteDark,
      text: item.text,
      avatar: isStuart ? stuartAvatar : impramAvatar,
      name: item.name,
      country: item.country,
      isDark: isStuart,
    };
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollLimits);
      checkScrollLimits();
      window.addEventListener("resize", checkScrollLimits);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScrollLimits);
      }
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth > 768 ? 718 : scrollRef.current.clientWidth - 24;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="testimoni"
      className="bg-bg-light -mx-6 md:-mx-12 lg:mx-[-50px] px-6 py-20 md:px-12 lg:px-24 lg:py-32 flex justify-center border-t border-border/10 overflow-hidden"
    >
      <div className="max-w-[1476px] w-full flex flex-col gap-10 md:gap-16 lg:gap-[75px] items-start">
        {/* Header Section */}
        <div className="flex flex-col gap-4 items-start w-full max-w-[901px]">
          <div className="flex gap-2.5 items-center">
            {/* Orange Bullet Point */}
            <span className="w-2.5 h-2.5 rounded-full bg-accent-brown shrink-0" />
            <span className="font-sans font-medium text-accent-brown text-sm md:text-base tracking-[0.8px] uppercase">
              {t("testimoni.tag")}
            </span>
          </div>
          <h2 className="font-sans font-medium text-text-dark text-3xl md:text-4xl lg:text-[48px] uppercase tracking-wide leading-tight">
            {t("testimoni.title")}
          </h2>
        </div>

        {/* Testimonials Horizontal List */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-[30px] overflow-x-auto snap-x snap-mandatory scrollbar-none w-full pb-6 pr-12 -mr-12"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`snap-start shrink-0 w-[calc(100vw-3rem)] sm:w-[500px] md:w-[688px] h-[480px] md:h-[546px] rounded-[20px] p-8 md:p-[30px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                t.isDark
                  ? "bg-[#1b2a41] text-white"
                  : "bg-[rgba(242,200,107,0.2)] text-text-dark"
              }`}
            >
              <div className="flex flex-col gap-6 md:gap-[50px] h-full justify-between">
                {/* Quote Icon */}
                <div className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] shrink-0">
                  <img
                    src={t.quoteIcon}
                    alt="Quote Icon"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Quote Text */}
                <p
                  className={`font-sans leading-[1.25] text-xl md:text-[32px] font-medium [word-break:break-word] line-clamp-5 ${
                    t.isDark
                      ? "text-white font-semibold"
                      : "text-text-dark font-medium"
                  }`}
                >
                  {t.text}
                </p>

                {/* Profile Section */}
                <div className="flex gap-3 md:gap-[9px] items-center shrink-0">
                  <div className="w-12 h-12 md:w-[90px] md:h-[90px] rounded-full overflow-hidden shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4
                      className={`font-sans font-bold text-lg md:text-[24px] leading-tight ${
                        t.isDark ? "text-white" : "text-text-dark"
                      }`}
                    >
                      {t.name}
                    </h4>
                    <p
                      className={`font-sans font-normal text-xs md:text-base leading-tight ${
                        t.isDark ? "text-white/80" : "text-text-dark/80"
                      }`}
                    >
                      {t.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 items-center shrink-0 mt-4">
          <SliderNavButton
            direction="left"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            icon={arrowLeft}
          />
          <SliderNavButton
            direction="right"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            icon={arrowRight}
          />
        </div>
      </div>
    </section>
  );
}
