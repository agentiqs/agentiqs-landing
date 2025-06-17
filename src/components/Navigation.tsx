
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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Brand */}
          <a href={brandLink} className="text-white font-bold text-lg hover:opacity-80 transition-opacity flex-shrink-0">
            {brandText.includes('.ai') ? (
              <>
                {brandText.replace('.ai', '')}
                <span className="text-ai-electric">.ai</span>
              </>
            ) : (
              brandText
            )}
          </a>

          {/* Navigation Tabs - Responsive */}
          {tabs.length > 0 && (
            <div className="flex-1 min-w-0 mx-4">
              <Tabs value={activeTab} className="w-full">
                <div className="overflow-x-auto scrollbar-hide">
                  <TabsList 
                    className="grid bg-gray-900/50 border border-gray-700 min-w-max"
                    style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
                  >
                    {tabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.id}
                        value={tab.id}
                        onClick={() => {
                          tab.onClick();
                          onTabChange?.(tab.id);
                        }}
                        className="text-sm font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors whitespace-nowrap px-3 py-2"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </div>
          )}

          {/* External Links - Hidden on very small screens, visible on sm+ */}
          {externalLinks.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              {externalLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-800/50 whitespace-nowrap"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* External Links - Mobile version below main nav */}
        {externalLinks.length > 0 && (
          <div className="sm:hidden flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-700">
            {externalLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-800/50"
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
                {link.external && <ExternalLink className="w-3 h-3" />}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
