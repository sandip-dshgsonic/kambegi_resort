import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import LocationSection from "@/sections/LocationSection";
import MasterplanSection from "@/sections/MasterplanSection";
import AccommodationSection from "@/sections/AccommodationSection";
import AmenitiesSection from "@/sections/AmenitiesSection";
import GallerySection from "@/sections/GallerySection";
import ContactSection from "@/sections/ContactSection";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import AmbientSound from "@/components/ui/AmbientSound";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MasterplanSection />
        <AccommodationSection />
        <AmenitiesSection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <AmbientSound />
    </SmoothScroll>
  );
}
