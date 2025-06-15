
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import TableOfContents from './TableOfContents';
import DocSearch from '@/components/DocSearch';
import type { DocConfig } from '@/utils/docLoader';

interface DocumentationSidebarProps {
  config: DocConfig;
  toc: Array<{id: string; title: string; level: number}>;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({ config, toc }) => {
  return (
    <div className="hidden xl:block w-80 border-l border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 bg-gray-900/30 dark:bg-gray-900/30 light:bg-white/80 backdrop-blur-md">
      <div className="sticky top-0 h-screen">
        <ScrollArea className="h-full py-6 px-4">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-white dark:text-white light:text-gray-900">TOOLS</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-white dark:text-white light:text-gray-900 mb-2">Search</h4>
                  <DocSearch config={config} />
                </div>
              </div>
            </div>

            {config.theme.showTableOfContents && toc.length > 0 && (
              <div>
                <h3 className="font-bold text-lg text-white dark:text-white light:text-gray-900 mb-4">ON THIS PAGE</h3>
                <TableOfContents toc={toc} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DocumentationSidebar;
