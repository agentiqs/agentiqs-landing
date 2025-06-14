
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Examples from "@/components/Examples";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
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
