
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { DocConfig } from '@/utils/docLoader';

interface SidebarProps {
  config: DocConfig;
  currentSectionId?: string;
  currentPageId?: string;
  onItemClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ config, currentSectionId, currentPageId, onItemClick }) => {
  const navigate = useNavigate();

  const handlePageClick = (sectionId: string, pageId: string) => {
    // Reset scroll position immediately when clicking a navigation item
    window.scrollTo({ top: 0, behavior: 'auto' });
    navigate(`/docs/${sectionId}/${pageId}`);
    onItemClick?.();
  };

  return (
    <ScrollArea className="h-full py-6 px-4">
      <div className="space-y-6">
        <div>
          <Link to="/" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-ai-electric transition-colors">
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-6 text-white">{config.title}</h3>
          <nav className="space-y-6">
            {config.sections.map((section, sectionIndex) => (
              <div key={section.id}>
                <h4 className="font-semibold text-sm uppercase tracking-wide text-white mb-3 border-b border-gray-700 pb-2">
                  {config.navigation.showSectionNumbers && `${sectionIndex + 1}. `}
                  {section.title}
                </h4>
                <ul className="space-y-1 ml-2">
                  {section.pages.map((page, pageIndex) => (
                    <li key={page.id}>
                      <button
                        onClick={() => handlePageClick(section.id, page.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                          currentSectionId === section.id && currentPageId === page.id
                            ? 'bg-ai-electric/20 text-ai-electric font-semibold border-l-2 border-ai-electric'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {config.navigation.showPageNumbers && `${pageIndex + 1}. `}
                        {page.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Sidebar;
