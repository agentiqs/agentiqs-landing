
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'examples', 'pricing'];
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <Tabs value={activeSection} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-gray-900/50 border border-gray-700">
            <TabsTrigger 
              value="home" 
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-white font-bold">
                Agentiqs<span className="text-ai-electric">.ai</span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
            >
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="examples" 
              onClick={() => scrollToSection('examples')}
              className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
            >
              Examples
            </TabsTrigger>
            <TabsTrigger 
              value="pricing" 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
};

export default Navigation;
