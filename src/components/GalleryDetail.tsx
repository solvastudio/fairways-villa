import { useState, useEffect, useCallback } from "react";

const IMAGES = [
  { src: "/assets/gallery/gallery-detail-1.webp", alt: "Master Bedroom" },
  { src: "/assets/gallery/gallery-detail-3.webp", alt: "Kitchen Dining Area" },
  { src: "/assets/gallery/gallery-detail-2.webp", alt: "Toilet Red Tiles" },
  { src: "/assets/gallery/gallery-detail-4.webp", alt: "Bathroom Shower" },
  { src: "/assets/gallery/gallery-detail-5.webp", alt: "Cozy Bedroom" },
  { src: "/assets/gallery/gallery-detail-6.webp", alt: "Living Room" }
];

export default function GalleryDetail() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    document.body.style.overflow = "";
  };

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % IMAGES.length : null));
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + IMAGES.length) % IMAGES.length : null));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, showNext, showPrev]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      id="gallery-detail"
      className="bg-bg-light -mx-6 md:-mx-12 lg:-mx-[50px] px-6 py-16 md:py-24 lg:py-[125px] flex flex-col items-center select-none"
    >
      <div className="max-w-[1440px] w-full flex flex-col gap-12 lg:gap-[100px] items-center">
        {/* Gallery Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[32px] items-start w-full">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-6 lg:gap-[32px] w-full lg:w-1/2">
            {/* Image 1 (Large Master Bedroom) */}
            <div
              onClick={() => openLightbox(0)}
              className="relative overflow-hidden rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
            >
              <img
                src="/assets/gallery/gallery-detail-1.webp"
                alt="Master Bedroom"
                className="w-full aspect-[720/619] object-cover rounded-[6px] group-hover:scale-102 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>

            {/* Sub-row (Side-by-side images) */}
            <div className="flex gap-4 lg:gap-[32px] w-full">
              {/* Image 3 (Kitchen / Dining Area) */}
              <div
                onClick={() => openLightbox(1)}
                className="relative overflow-hidden rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-300 w-1/2 group cursor-pointer"
              >
                <img
                  src="/assets/gallery/gallery-detail-3.webp"
                  alt="Kitchen Dining Area"
                  className="w-full aspect-[340/351] object-cover rounded-[6px] group-hover:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Image 2 (Toilet / Red Tiles) */}
              <div
                onClick={() => openLightbox(2)}
                className="relative overflow-hidden rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-300 w-1/2 group cursor-pointer"
              >
                <img
                  src="/assets/gallery/gallery-detail-2.webp"
                  alt="Toilet Red Tiles"
                  className="w-full aspect-[348/351] object-cover rounded-[6px] group-hover:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="flex flex-col gap-6 lg:gap-[32px] w-full lg:w-1/2">
            {/* Sub-row (Side-by-side images) */}
            <div className="flex gap-4 lg:gap-[32px] w-full">
              {/* Image 4 (Bathroom / Shower) */}
              <div
                onClick={() => openLightbox(3)}
                className="relative overflow-hidden rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-300 w-1/2 group cursor-pointer"
              >
                <img
                  src="/assets/gallery/gallery-detail-4.webp"
                  alt="Bathroom Shower"
                  className="w-full aspect-[340/351] object-cover rounded-[6px] group-hover:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Image 5 (Cozy Bedroom) */}
              <div
                onClick={() => openLightbox(4)}
                className="relative overflow-hidden rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-300 w-1/2 group cursor-pointer"
              >
                <img
                  src="/assets/gallery/gallery-detail-5.webp"
                  alt="Cozy Bedroom"
                  className="w-full aspect-square object-cover rounded-[6px] group-hover:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Image 6 (Large Living Room with Sofa) */}
            <div
              onClick={() => openLightbox(5)}
              className="relative overflow-hidden rounded-[6px] shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
            >
              <img
                src="/assets/gallery/gallery-detail-6.webp"
                alt="Living Room"
                className="w-full aspect-[723/619] object-cover rounded-[6px] group-hover:scale-102 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Viewer Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="w-full max-w-[1440px] flex items-center justify-between z-10">
            <span className="text-white/80 font-sans text-xs md:text-sm tracking-wider uppercase">
              {IMAGES[activeIndex].alt}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-white/60 font-sans text-xs md:text-sm tracking-wider">
                {activeIndex + 1} / {IMAGES.length}
              </span>
              <button
                onClick={closeLightbox}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 cursor-pointer active:scale-90"
                aria-label="Close"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Display Area */}
          <div className="flex-1 w-full flex items-center justify-center relative my-4">
            {/* Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-0 md:left-4 z-10 text-white/80 hover:text-white bg-black/45 hover:bg-black/60 p-3 md:p-4 rounded-full transition-all duration-200 cursor-pointer active:scale-95 border border-white/10 shadow-lg"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Large Image */}
            <div
              className="relative max-w-[90vw] max-h-[70vh] md:max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={IMAGES[activeIndex].src}
                src={IMAGES[activeIndex].src}
                alt={IMAGES[activeIndex].alt}
                className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-[4px] shadow-2xl select-none animate-zoom-in"
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-0 md:right-4 z-10 text-white/80 hover:text-white bg-black/45 hover:bg-black/60 p-3 md:p-4 rounded-full transition-all duration-200 cursor-pointer active:scale-95 border border-white/10 shadow-lg"
              aria-label="Next"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnails Navigation */}
          <div className="w-full max-w-[600px] flex justify-center gap-2 md:gap-3 py-2 z-10 overflow-x-auto scrollbar-none">
            {IMAGES.map((img, idx) => (
              <button
                key={img.src}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-[4px] overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "border-primary scale-105 shadow-md shadow-primary/20"
                    : "border-transparent opacity-40 hover:opacity-80"
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
