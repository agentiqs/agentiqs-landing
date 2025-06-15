
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DocSection, DocPage } from '@/utils/docLoader';

interface PageNavigationProps {
  previous: { section: DocSection; page: DocPage } | null;
  next: { section: DocSection; page: DocPage } | null;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ previous, next }) => {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700 dark:border-gray-700">
      <div className="flex-1">
        {previous && (
          <Link
            to={`/docs/${previous.section.id}/${previous.page.id}`}
            className="group flex items-center space-x-3 text-sm text-gray-400 hover:text-gray-200 transition-colors p-4 rounded-lg hover:bg-gray-800/50"
          >
            <ChevronLeft className="h-5 w-5 text-ai-electric" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Previous</div>
              <div className="group-hover:text-ai-electric font-medium transition-colors">{previous.page.title}</div>
            </div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 text-right">
        {next && (
          <Link
            to={`/docs/${next.section.id}/${next.page.id}`}
            className="group flex items-center justify-end space-x-3 text-sm text-gray-400 hover:text-gray-200 transition-colors p-4 rounded-lg hover:bg-gray-800/50"
          >
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Next</div>
              <div className="group-hover:text-ai-electric font-medium transition-colors">{next.page.title}</div>
            </div>
            <ChevronRight className="h-5 w-5 text-ai-electric" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageNavigation;
