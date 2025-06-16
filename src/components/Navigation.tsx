
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { NavigationConfig } from "@/types/navigation";

interface NavigationProps {
  config: NavigationConfig;
}

const Navigation = ({ config }: NavigationProps) => {
  const {
    brandText = "Agentiqs.ai",
    brandLink = "/",
    tabs = [],
    externalLinks = [],
    activeTab,
    onTabChange
  } = config;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <a href={brandLink} className="text-white font-bold text-lg hover:opacity-80 transition-opacity">
            {brandText.includes('.ai') ? (
              <>
                {brandText.replace('.ai', '')}
                <span className="text-ai-electric">.ai</span>
              </>
            ) : (
              brandText
            )}
          </a>

          {/* Navigation Tabs */}
          {tabs.length > 0 && (
            <Tabs value={activeTab} className="flex-1 max-w-2xl mx-8">
              <TabsList className={`grid w-full bg-gray-900/50 border border-gray-700`} style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id}
                    onClick={() => {
                      tab.onClick();
                      onTabChange?.(tab.id);
                    }}
                    className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {/* External Links */}
          {externalLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {externalLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-800/50"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
