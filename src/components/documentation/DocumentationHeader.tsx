
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/ThemeToggle';
import Sidebar from './Sidebar';
import type { DocConfig } from '@/utils/docLoader';

interface DocumentationHeaderProps {
  config: DocConfig;
  currentSectionId?: string;
  currentPageId?: string;
}

const DocumentationHeader: React.FC<DocumentationHeaderProps> = ({ 
  config, 
  currentSectionId, 
  currentPageId 
}) => {
  return (
    <div className="lg:hidden border-b border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 bg-gray-900/50 dark:bg-gray-900/50 light:bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white dark:text-white light:text-gray-900 hover:bg-gray-800 light:hover:bg-gray-100">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 bg-gray-900/95 dark:bg-gray-900/95 light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-200 backdrop-blur-md">
            <Sidebar
              config={config}
              currentSectionId={currentSectionId}
              currentPageId={currentPageId}
              onItemClick={() => {}}
            />
          </SheetContent>
        </Sheet>
        <h1 className="font-semibold text-white dark:text-white light:text-gray-900">Documentation</h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DocumentationHeader;
