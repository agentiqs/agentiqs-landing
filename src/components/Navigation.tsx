
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

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
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-white font-bold text-lg">
            Agentiqs<span className="text-ai-electric">.ai</span>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeSection} className="flex-1 max-w-2xl mx-8">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-700">
              <TabsTrigger 
                value="home" 
                onClick={() => scrollToSection('home')}
                className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
              >
                Home
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

          {/* External Links */}
          <div className="flex items-center gap-4">
            <a 
              href="/docs" 
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-800/50"
            >
              Docs
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="/blog" 
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-800/50"
            >
              Blog
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
