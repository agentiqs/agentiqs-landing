
import React, { useState, useEffect } from 'react';

interface TableOfContentsProps {
  toc: Array<{id: string; title: string; level: number}>;
  onItemClick?: () => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc, onItemClick }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Find the topmost visible heading
      let currentActiveId = '';
      let minDistance = Infinity;

      toc.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the heading is above the viewport center
          if (rect.top <= window.innerHeight * 0.3) {
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              currentActiveId = item.id;
            }
          }
        }
      });

      // If no heading is above the center, use the first visible one
      if (!currentActiveId) {
        for (const item of toc) {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight) {
              currentActiveId = item.id;
              break;
            }
          }
        }
      }

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    // Add scroll listener with throttling
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [toc, activeId]);

  if (toc.length === 0) return null;

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    onItemClick?.();
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm uppercase tracking-wide text-white dark:text-white">
        On This Page
      </h4>
      <nav className="space-y-2">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleTocClick(e, item.id)}
            className={`block text-sm transition-colors border-l-2 pl-3 py-2 rounded-r ${
              activeId === item.id
                ? 'border-ai-electric text-ai-electric font-medium bg-ai-electric/10'
                : 'border-transparent hover:text-gray-300 hover:border-gray-600 text-gray-400'
            } ${
              item.level === 1 ? '' : 
              item.level === 2 ? 'ml-3' : 
              'ml-6'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
