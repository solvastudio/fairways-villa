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

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="w-full px-6 md:px-12 lg:px-[50px] overflow-x-hidden">
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
