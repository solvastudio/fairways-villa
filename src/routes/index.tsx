import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Villa from "../components/Villa";
import Gallery from "../components/Gallery";
import Neighbourhood from "../components/Neighbourhood";
import Testimoni from "../components/Testimoni";
import Faq from "../components/Faq";
import CTA from "../components/CTA";
import LocationFooter from "../components/LocationFooter";
import SEOMeta from "../components/SEOMeta";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      "name": "Fairways Villa Belek",
      "description": t("seo.homeDescription"),
      "image": `${window.location.origin}/assets/villa/hero-bg.webp`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kadriye, V29H+7H",
        "addressLocality": "Serik/Antalya",
        "addressCountry": "TR",
        "postalCode": "07525"
      },
      "telephone": "+905378435048",
      "starRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-vacation-rental";
    script.text = JSON.stringify(schema);
    
    // Remove existing script if any
    document.getElementById("schema-vacation-rental")?.remove();
    document.head.appendChild(script);

    return () => {
      document.getElementById("schema-vacation-rental")?.remove();
    };
  }, [t]);

  return (
    <main className="w-full px-6 md:px-12 lg:px-[50px] overflow-x-hidden">
      <SEOMeta page="home" />
      <Hero />
      <AboutUs />
      <Villa />
      <Gallery />
      <Neighbourhood />
      <Testimoni />
      <Faq />
      <CTA />
      <LocationFooter />
    </main>
  );
}
