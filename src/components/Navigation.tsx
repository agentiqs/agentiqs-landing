
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gray-100">
            <TabsTrigger 
              value="home" 
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium data-[state=active]:bg-white"
            >
              <span className="text-ai-blue font-bold">
                Agentiqs<span className="text-ai-electric">.ai</span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium data-[state=active]:bg-white"
            >
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="pricing" 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium data-[state=active]:bg-white"
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
