import { useTranslation } from "react-i18next";
import AroundCard from "./AroundCard";
import SurroundingItem from "./SurroundingItem";

interface SurroundingData {
  name: string;
  detail?: string;
}

export default function Neighbourhood() {
  const { t } = useTranslation();

  const transportationList = t("neighbourhood.transportationList", { returnObjects: true }) as SurroundingData[];
  const beachesList = t("neighbourhood.beachesList", { returnObjects: true }) as SurroundingData[];
  const attractionsList = t("neighbourhood.attractionsList", { returnObjects: true }) as SurroundingData[];
  const conveniencesList = t("neighbourhood.conveniencesList", { returnObjects: true }) as SurroundingData[];
  const marketsList = t("neighbourhood.marketsList", { returnObjects: true }) as SurroundingData[];

  return (
    <section
      id="neighbourhood"
      className="bg-bg-light -mx-6 md:-mx-12 lg:mx-[-50px] px-6 md:px-12 lg:px-24 lg:py-32 flex justify-center"
    >
      <div className="max-w-[1440px] w-full flex flex-col gap-20 lg:gap-28">
        
        {/* Top Header & Visual Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full">
          
          {/* Left Column: Title & Description */}
          <div className="flex flex-col items-start w-full lg:w-[432px] shrink-0">
            {/* Tag/Kicker */}
            <div className="flex items-center gap-2.5 mb-6 lg:mb-10">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-brown shrink-0" aria-hidden="true" />
              <span className="font-sans font-medium text-accent-brown text-sm lg:text-base tracking-[0.8px] uppercase">
                {t("neighbourhood.tag")}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-sans font-medium text-text-dark text-4xl lg:text-[48px] uppercase leading-tight tracking-normal mb-8 lg:mb-12">
              {t("neighbourhood.title")}
            </h2>

            {/* Description Paragraph */}
            <p className="font-sans font-light text-text-dark text-base lg:text-[20px] tracking-[1px] leading-relaxed">
              {t("neighbourhood.description")}
            </p>
          </div>

          {/* Right Column: 2x2 Image Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full">
            <AroundCard
              imageSrc="/assets/neighbourhood/kadriye-beach.webp"
              title={t("neighbourhood.cards.kadriye")}
            />
            <AroundCard
              imageSrc="/assets/neighbourhood/land-of-legends.webp"
              title={t("neighbourhood.cards.legends")}
            />
            <AroundCard
              imageSrc="/assets/neighbourhood/aspendos.webp"
              title={t("neighbourhood.cards.aspendos")}
            />
            <AroundCard
              imageSrc="/assets/neighbourhood/belek-beach.webp"
              title={t("neighbourhood.cards.belek")}
            />
          </div>

        </div>

        {/* Bottom Details Section: Jarak & Informasi */}
        <div className="flex flex-col gap-16 lg:gap-20 w-full border-t border-border/40">
          
          {/* Row 1: 3 Columns (Transportation, Beaches, Attractions) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 w-full">
            
            {/* Col 1: Transportation */}
            <div className="flex flex-col gap-8 md:pr-8 lg:pr-12 md:border-r border-border/40">
              <h3 className="font-sans font-normal text-text-dark text-xl md:text-[24px] tracking-[1.2px] capitalize">
                {t("neighbourhood.headers.transportation")}
              </h3>
              <div className="flex flex-col gap-6">
                {transportationList.map((item, idx) => (
                  <SurroundingItem key={idx} name={item.name} detail={item.detail} />
                ))}
              </div>
            </div>

            {/* Col 2: Beaches */}
            <div className="flex flex-col gap-8 md:pr-8 lg:pr-12 md:border-r border-border/40">
              <h3 className="font-sans font-normal text-text-dark text-xl md:text-[24px] tracking-[1.2px] capitalize">
                {t("neighbourhood.headers.beaches")}
              </h3>
              <div className="flex flex-col gap-6">
                {beachesList.map((item, idx) => (
                  <SurroundingItem key={idx} name={item.name} detail={item.detail} />
                ))}
              </div>
            </div>

            {/* Col 3: Attractions */}
            <div className="flex flex-col gap-8">
              <h3 className="font-sans font-normal text-text-dark text-xl md:text-[24px] tracking-[1.2px] capitalize">
                {t("neighbourhood.headers.attractions")}
              </h3>
              <div className="flex flex-col gap-6">
                {attractionsList.map((item, idx) => (
                  <SurroundingItem key={idx} name={item.name} detail={item.detail} />
                ))}
              </div>
            </div>

          </div>

          {/* Row 2: 2 Columns (Conveniences, Markets) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 w-full border-t border-border/40">
            
            {/* Col 1: Conveniences */}
            <div className="flex flex-col gap-8 md:pr-8 lg:pr-12 md:border-r border-border/40">
              <h3 className="font-sans font-normal text-text-dark text-xl md:text-[24px] tracking-[1.2px] capitalize">
                {t("neighbourhood.headers.conveniences")}
              </h3>
              <div className="flex flex-col gap-6">
                {conveniencesList.map((item, idx) => (
                  <SurroundingItem key={idx} name={item.name} />
                ))}
              </div>
            </div>

            {/* Col 2: Markets & Shopping */}
            <div className="flex flex-col gap-8">
              <h3 className="font-sans font-normal text-text-dark text-xl md:text-[24px] tracking-[1.2px] capitalize">
                {t("neighbourhood.headers.markets")}
              </h3>
              <div className="flex flex-col gap-6">
                {marketsList.map((item, idx) => (
                  <SurroundingItem key={idx} name={item.name} />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
