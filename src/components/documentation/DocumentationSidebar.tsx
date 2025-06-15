
import React from 'react';
import DocSearch from '@/components/DocSearch';
import ThemeToggle from '@/components/ThemeToggle';
import TableOfContents from './TableOfContents';
import { Separator } from '@/components/ui/separator';
import type { DocConfig } from '@/utils/docLoader';

interface DocumentationSidebarProps {
  config: DocConfig;
  toc: Array<{id: string; title: string; level: number}>;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({ config, toc }) => {
  return (
    <aside className="hidden xl:block w-80 border-l border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 bg-gray-900/30 dark:bg-gray-900/30 light:bg-white/80 backdrop-blur-md">
      <div className="sticky top-0 h-screen overflow-auto p-6">
        <div className="space-y-8">
          {/* Header with theme toggle */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-white dark:text-white light:text-gray-900">
              Tools
            </h4>
            <ThemeToggle />
          </div>

          {/* Search */}
          <div className="space-y-4">
            <h5 className="font-medium text-sm text-gray-300 dark:text-gray-300 light:text-gray-600">
              Search
            </h5>
            <DocSearch config={config} />
          </div>

          {/* Separator */}
          <Separator className="bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-200" />

          {/* Table of Contents */}
          {config.theme.showTableOfContents && toc.length > 0 && (
            <TableOfContents toc={toc} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default DocumentationSidebar;
