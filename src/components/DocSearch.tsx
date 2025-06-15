
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import type { DocConfig } from '@/utils/docLoader';

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  pageId: string;
  pageTitle: string;
  excerpt?: string;
}

interface DocSearchProps {
  config: DocConfig;
  onResultClick?: () => void;
}

const DocSearch: React.FC<DocSearchProps> = ({ config, onResultClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    config.sections.forEach((section) => {
      section.pages.forEach((page) => {
        const titleMatch = page.title.toLowerCase().includes(searchTerm);
        const sectionMatch = section.title.toLowerCase().includes(searchTerm);
        
        if (titleMatch || sectionMatch) {
          searchResults.push({
            sectionId: section.id,
            sectionTitle: section.title,
            pageId: page.id,
            pageTitle: page.title,
          });
        }
      });
    });

    setResults(searchResults);
    setIsOpen(searchResults.length > 0);
  }, [query, config]);

  const handleResultClick = (result: SearchResult) => {
    navigate(`/docs/${result.sectionId}/${result.pageId}`);
    setQuery('');
    setIsOpen(false);
    onResultClick?.();
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-ai-electric"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
          <ScrollArea className="max-h-80">
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={`${result.sectionId}-${result.pageId}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors"
                >
                  <div className="text-sm font-medium text-white">
                    {result.pageTitle}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {result.sectionTitle}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default DocSearch;
