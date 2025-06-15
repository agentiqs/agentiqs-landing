
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { loadMarkdownContent } from '@/utils/docLoader';
import type { DocConfig } from '@/utils/docLoader';

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  pageId: string;
  pageTitle: string;
  excerpt?: string;
  score: number;
}

interface DocSearchProps {
  config: DocConfig;
  onResultClick?: () => void;
}

const DocSearch: React.FC<DocSearchProps> = ({ config, onResultClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      const searchResults: SearchResult[] = [];
      const searchTerm = query.toLowerCase();

      for (const section of config.sections) {
        for (const page of section.pages) {
          let score = 0;
          let excerpt = '';

          // Search in title
          if (page.title.toLowerCase().includes(searchTerm)) {
            score += 10;
          }

          // Search in section title
          if (section.title.toLowerCase().includes(searchTerm)) {
            score += 5;
          }

          // Search in content
          try {
            const content = await loadMarkdownContent(page.file);
            const contentLower = content.toLowerCase();
            
            if (contentLower.includes(searchTerm)) {
              score += 3;
              
              // Extract excerpt around the match
              const index = contentLower.indexOf(searchTerm);
              const start = Math.max(0, index - 50);
              const end = Math.min(content.length, index + 100);
              excerpt = content.slice(start, end).trim();
              
              // Clean up markdown formatting for excerpt
              excerpt = excerpt.replace(/[#*`]/g, '').replace(/\n/g, ' ');
              if (start > 0) excerpt = '...' + excerpt;
              if (end < content.length) excerpt = excerpt + '...';
            }
          } catch (error) {
            console.warn(`Failed to load content for ${page.file}:`, error);
          }

          if (score > 0) {
            searchResults.push({
              sectionId: section.id,
              sectionTitle: section.title,
              pageId: page.id,
              pageTitle: page.title,
              excerpt,
              score,
            });
          }
        }
      }

      // Sort by score (highest first)
      searchResults.sort((a, b) => b.score - a.score);
      
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400 light:text-gray-500" />
        <Input
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-gray-800/50 dark:bg-gray-800/50 light:bg-white border-gray-600 dark:border-gray-600 light:border-gray-200 text-white dark:text-white light:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-400 light:placeholder:text-gray-500 focus:border-ai-electric"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-600 dark:border-gray-600 light:border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
          <ScrollArea className="max-h-80">
            <div className="p-2">
              {isSearching && (
                <div className="p-3 text-center text-gray-400 dark:text-gray-400 light:text-gray-500">
                  Searching...
                </div>
              )}
              {!isSearching && results.length === 0 && query.length >= 2 && (
                <div className="p-3 text-center text-gray-400 dark:text-gray-400 light:text-gray-500">
                  No results found
                </div>
              )}
              {!isSearching && results.map((result, index) => (
                <button
                  key={`${result.sectionId}-${result.pageId}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="text-sm font-medium text-white dark:text-white light:text-gray-900">
                    {result.pageTitle}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">
                    {result.sectionTitle}
                  </div>
                  {result.excerpt && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500 mt-1 line-clamp-2">
                      {result.excerpt}
                    </div>
                  )}
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
