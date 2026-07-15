import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Star, MapPin } from "lucide-react";
import QuickStat from "../ui/QuickStat";
import DetailItem from "../ui/DetailItem";
import {
  propertyDetails,
  convenientLocations,
  facilityCategoriesData
} from "../../data/villaDetails";

export default function VillaOverview() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"highlights" | "facilities">("highlights");
  const [activeFacilityTab, setActiveFacilityTab] = useState<string>("inVillaComfort");

  const handleTabClick = (tab: "highlights" | "facilities") => {
    setActiveTab(tab);
  };

  const renderSubcategory = (subId: string, items: string[]) => {
    return (
      <div className="flex flex-col gap-6 lg:gap-[50px] items-start w-full">
        <h4 className="font-sans font-normal text-xl lg:text-[24px] text-text-dark tracking-[1.2px] uppercase">
          {t(`villaDetail.facilitiesSubcategories.${subId}`)}
        </h4>
        <div className="flex flex-col gap-4 lg:gap-[25px] items-start w-full">
          {items.map((itemKey) => (
            <div key={itemKey} className="flex gap-[10px] items-center text-[#03071e]">
              <div className="w-[10px] h-[10px] rounded-full bg-primary shrink-0" />
              <span className="font-sans font-light text-base lg:text-[20px] tracking-[1px]">
                {t(`villaDetail.facilitiesItems.${itemKey}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const activeCategoryData = facilityCategoriesData.find(cat => cat.id === activeFacilityTab);
  const subcategories = activeCategoryData?.subcategories || [];
  const mainSubcategories = subcategories.length === 4 ? subcategories.slice(0, 3) : subcategories;
  const bottomSubcategory = subcategories.length === 4 ? subcategories[3] : null;

  return (
    <section
      id="villa-overview"
      className="bg-bg-light -mx-6 md:-mx-12 lg:-mx-[50px] px-6 py-16 md:py-24 lg:py-[125px] flex flex-col items-center select-none border-b border-border/10"
    >
      <div className="max-w-[1440px] w-full flex flex-col gap-12 lg:gap-[100px]">
        {/* Overview Header */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px] justify-between items-start w-full">
          <h2 className="font-sans font-medium text-3xl lg:text-[40px] text-text-dark tracking-[2px] uppercase lg:w-[238px] shrink-0">
            {t("villaDetail.overview")}
          </h2>
          <p className="font-sans font-light text-lg lg:text-[24px] text-text-dark/80 tracking-[1.2px] leading-relaxed max-w-[854px]">
            {t("villaDetail.overviewText")}
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="border-y border-[#c97a4a]/20 py-6 lg:py-[25px] flex flex-col md:flex-row flex-wrap gap-6 lg:gap-[86px] justify-between items-start md:items-center w-full">
          {/* Guests Stat */}
          <QuickStat
            icon={<Users className="w-[30px] h-[30px] stroke-[1.5]" />}
            content={<span>{t("villaDetail.guestsMax")}</span>}
          />

          {/* Rating Stat */}
          <QuickStat
            icon={<Star className="w-[30px] h-[30px] fill-primary stroke-primary stroke-[1.5]" />}
            content={<span>{t("villaDetail.exceptionalStay")}</span>}
          />

          {/* Location Stat */}
          <QuickStat
            icon={<MapPin className="w-[30px] h-[30px] stroke-[1.5]" />}
            content={
              <span className="font-light text-sm lg:text-[24px] tracking-[1.2px] max-w-[390px] block leading-snug">
                {t("villaDetail.address")}
              </span>
            }
          />
        </div>

        {/* Highlights & Facilities Section */}
        <div className="flex flex-col gap-8 lg:gap-[60px] w-full">
          {/* Tabs Switcher */}
          <div className="flex flex-col gap-4 w-full max-w-[428px]">
            <div className="flex gap-[44px] text-[20px] lg:text-[28px] font-sans font-medium tracking-[1.4px]">
              <button
                onClick={() => handleTabClick("highlights")}
                className={`uppercase pb-2 cursor-pointer transition-all duration-300 ${
                  activeTab === "highlights"
                    ? "text-text-dark border-b-2 border-primary lg:border-b-0"
                    : "text-text-dark/40 hover:text-text-dark/60 border-b-2 border-transparent"
                }`}
              >
                {t("villaDetail.highlights")}
              </button>
              <button
                onClick={() => handleTabClick("facilities")}
                className={`uppercase pb-2 cursor-pointer transition-all duration-300 ${
                  activeTab === "facilities"
                    ? "text-text-dark border-b-2 border-primary lg:border-b-0"
                    : "text-text-dark/40 hover:text-text-dark/60 border-b-2 border-transparent"
                }`}
              >
                {t("villaDetail.facilities")}
              </button>
            </div>
            {/* Custom Tab Line Indicator for Desktop */}
            <div className="hidden lg:block h-[2px] bg-[#c97a4a]/20 relative w-full">
              <div
                className={`absolute top-0 h-[2px] bg-primary transition-all duration-300`}
                style={{
                  width: activeTab === "highlights" ? "211px" : "191px",
                  left: activeTab === "highlights" ? "0px" : "255px"
                }}
              />
            </div>
          </div>

          {/* Details Content Container */}
          <div className="w-full">
            {/* Highlights Content */}
            {activeTab === "highlights" && (
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 w-full justify-between items-stretch">
                {/* Property Details */}
                <div className="flex-1 flex flex-col gap-6 lg:gap-[50px] w-full">
                  <h3 className="font-sans font-normal text-xl lg:text-[24px] text-text-dark tracking-[1.2px] uppercase">
                    {t("villaDetail.propertyDetails")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 lg:gap-[47px]">
                    {propertyDetails.map((item) => (
                      <DetailItem
                        key={item.id}
                        icon={item.icon}
                        title={t(item.titleKey)}
                        subtitle={item.subtitleKey ? t(item.subtitleKey) : undefined}
                      />
                    ))}
                  </div>
                </div>

                {/* Vertical Divider (Desktop Only) */}
                <div className="hidden lg:block w-[1px] bg-[#c97a4a]/20 mx-[69px] self-stretch min-h-[400px]" />

                {/* Convenient Location */}
                <div className="flex-1 flex flex-col gap-6 lg:gap-[50px] w-full">
                  <h3 className="font-sans font-normal text-xl lg:text-[24px] text-text-dark tracking-[1.2px] uppercase">
                    {t("villaDetail.convenientLocation")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 lg:gap-[35px]">
                    {convenientLocations.map((item) => (
                      <DetailItem
                        key={item.id}
                        icon={item.icon}
                        title={t(item.titleKey)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Facilities Content */}
            {activeTab === "facilities" && (
              <div className="flex flex-col gap-8 lg:gap-[60px] w-full">
                {/* Pills Category Selector */}
                <div className="flex flex-wrap gap-4 items-center justify-start lg:justify-center w-full">
                  {facilityCategoriesData.map((cat) => {
                    const isActive = activeFacilityTab === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveFacilityTab(cat.id)}
                        className={`px-5 py-3 lg:px-[20px] lg:py-[16px] rounded-full text-sm lg:text-[20px] font-sans uppercase tracking-[1px] transition-all duration-300 cursor-pointer shadow-[0_6px_8px_rgba(0,0,0,0.08)] ${
                          isActive
                            ? "bg-primary text-white border border-primary font-medium"
                            : "bg-white text-text-dark border border-primary/40 font-light hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        {t(cat.titleKey)}
                      </button>
                    );
                  })}
                </div>

                {/* Bullet Lists */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-center items-stretch w-full mt-4 lg:mt-8">
                  {mainSubcategories.map((sub, idx) => {
                    const isSingleColumn = mainSubcategories.length === 1;
                    return (
                      <div
                        key={sub.id}
                        className={`flex flex-col lg:flex-row items-stretch w-full ${
                          isSingleColumn ? "max-w-[498px] mx-auto" : "flex-1"
                        }`}
                      >
                        {idx > 0 && (
                          <div className="hidden lg:block w-[1px] bg-[#c97a4a]/20 mx-[34px] self-stretch min-h-[405px]" />
                        )}
                        <div className="flex-1 w-full">
                          {renderSubcategory(sub.id, sub.items)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {bottomSubcategory && (
                  <div className="flex flex-col items-center mt-8 lg:mt-[70px] w-full">
                    <div className="w-full max-w-[400px]">
                      {renderSubcategory(bottomSubcategory.id, bottomSubcategory.items)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
