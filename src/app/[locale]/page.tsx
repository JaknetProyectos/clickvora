import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import ToolsSection from "@/components/ToolsSection";
import MissionsSection from "@/components/MissionsSection";
import PricingSection from "@/components/PricingSection";
import ServicesSection from "@/components/ServicesSection";
import CustomPlanSection from "@/components/CustomPlanSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhySection />
      <ToolsSection />
      <MissionsSection />
      <PricingSection />
      <ServicesSection />
      <CustomPlanSection />
      <ContactSection />
    </main>
  );
}
