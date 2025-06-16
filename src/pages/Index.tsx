
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Examples from "@/components/Examples";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useLandingNavigation } from "@/hooks/useLandingNavigation";

const Index = () => {
  const navigationConfig = useLandingNavigation();

  return (
    <div className="min-h-screen">
      <Navigation config={navigationConfig} />
      <div id="home">
        <Hero />
      </div>
      <div id="features">
        <Features />
      </div>
      <Examples />
      <Benefits />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
