import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function Faq() {
  const { t } = useTranslation();
  const leftFaqItems = t("faq.leftFaqItems", { returnObjects: true }) as FaqItem[];
  const rightFaqItems = t("faq.rightFaqItems", { returnObjects: true }) as FaqItem[];

  // Set the last item (distance-center) as open by default, matching the Figma design screenshot
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "distance-center": true,
  });

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderColumn = (items: FaqItem[]) => {
    return (
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-[75px] w-full">
        {items.map((item) => {
          const isExpanded = !!expandedItems[item.id];
          return (
            <div
              key={item.id}
              className="flex flex-col gap-4 items-start w-full group transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="flex justify-between items-center w-full text-left font-sans font-medium text-text-dark text-lg md:text-xl lg:text-2xl tracking-[0.5px] capitalize hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                <span className="pr-4 leading-snug">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 md:w-6 md:h-6 text-text-dark shrink-0 transition-transform duration-300 ${
                    isExpanded ? "rotate-180 text-primary" : "group-hover:text-primary"
                  }`}
                />
              </button>

              {/* Answer Body (Animated slide-down) */}
              <div
                className={`grid transition-all duration-300 ease-in-out w-full text-text-dark/80 font-sans font-normal text-sm md:text-base lg:text-[20px] tracking-[0.5px] leading-relaxed ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pt-2">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="faq"
      className="bg-bg-light -mx-6 md:-mx-12 lg:mx-[-50px] px-6  md:px-12 lg:px-24 lg:py-32 flex justify-center border-t border-border/10"
    >
      <div className="max-w-[1476px] w-full flex flex-col gap-10 md:gap-16 lg:gap-[100px] items-center">
        {/* Header Section */}
        <div className="flex flex-col gap-4 items-center text-center w-full max-w-[901px]">
          <div className="flex gap-2.5 items-center">
            {/* Orange Bullet Point */}
            <span className="w-2.5 h-2.5 rounded-full bg-accent-brown shrink-0" />
            <span className="font-sans font-medium text-accent-brown text-sm md:text-base tracking-[0.8px] uppercase">
              {t("faq.tag")}
            </span>
          </div>
          <h2 className="font-sans font-medium text-text-dark text-3xl md:text-4xl lg:text-[48px] uppercase tracking-wide leading-tight">
            {t("faq.title")}
          </h2>
        </div>

        {/* Content Section (Grid layout for responsive behavior) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-[205px] w-full items-start">
          {renderColumn(leftFaqItems)}
          {renderColumn(rightFaqItems)}
        </div>
      </div>
    </section>
  );
}
