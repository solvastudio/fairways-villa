import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import SEOMeta from "../components/SEOMeta";

const Villa = lazy(() => import("../components/Villa"));
const Gallery = lazy(() => import("../components/Gallery"));
const Neighbourhood = lazy(() => import("../components/Neighbourhood"));
const Testimoni = lazy(() => import("../components/Testimoni"));
const Faq = lazy(() => import("../components/Faq"));
const CTA = lazy(() => import("../components/CTA"));
const LocationFooter = lazy(() => import("../components/LocationFooter"));

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
      <Suspense fallback={null}>
        <Villa />
        <Gallery />
        <Neighbourhood />
        <Testimoni />
        <Faq />
        <CTA />
        <LocationFooter />
      </Suspense>
    </main>
  );
}
