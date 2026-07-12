import { createFileRoute } from "@tanstack/react-router";
import VillaDetailHero from "../components/VillaDetailHero";
import VillaOverview from "../components/villa/VillaOverview";
import GalleryDetail from "../components/GalleryDetail";
import CTA from "../components/CTA";
import LocationFooter from "../components/LocationFooter";
import SEOMeta from "../components/SEOMeta";

export const Route = createFileRoute("/villa")({
  component: VillaDetail,
});

function VillaDetail() {
  return (
    <main className="w-full px-6 md:px-12 lg:px-[50px] overflow-x-hidden">
      <SEOMeta page="villa" />
      <VillaDetailHero />
      <VillaOverview />
      <GalleryDetail />
      <CTA />
      <LocationFooter />
    </main>
  );
}
