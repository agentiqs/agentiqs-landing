
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
  headingId?: string;
  headingTitle?: string;
  headingLevel?: number;
  excerpt?: string;
  score: number;
  type: 'page' | 'heading';
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

  // Parse headings from markdown content
  const parseHeadings = (content: string) => {
    const headings: Array<{id: string; title: string; level: number}> = [];
    const usedIds = new Set<string>();
    
    // Split content into lines and track if we're inside a code block
    const lines = content.split('\n');
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for code block delimiters
      if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      
      // Skip lines inside code blocks
      if (inCodeBlock) {
        continue;
      }
      
      // Check for headings (only outside code blocks)
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const title = headingMatch[2].trim();
        
        // Generate base ID
        let baseId = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Make ID unique if it already exists
        let id = baseId;
        let counter = 1;
        while (usedIds.has(id)) {
          id = `${baseId}-${counter}`;
          counter++;
        }
        usedIds.add(id);
        
        headings.push({ id, title, level });
      }
    }
    
    return headings;
  };

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
          try {
            const content = await loadMarkdownContent(page.file);
            const headings = parseHeadings(content);
            const contentLower = content.toLowerCase();

            // Search in page title
            if (page.title.toLowerCase().includes(searchTerm)) {
              let excerpt = '';
              // Extract excerpt from page content
              const excerptMatch = content.match(/.{0,100}/);
              if (excerptMatch) {
                excerpt = excerptMatch[0].replace(/[#*`]/g, '').replace(/\n/g, ' ').trim();
                if (excerpt.length < content.length) excerpt += '...';
              }

              searchResults.push({
                sectionId: section.id,
                sectionTitle: section.title,
                pageId: page.id,
                pageTitle: page.title,
                excerpt,
                score: 15,
                type: 'page'
              });
            }

            // Search in section title
            if (section.title.toLowerCase().includes(searchTerm)) {
              searchResults.push({
                sectionId: section.id,
                sectionTitle: section.title,
                pageId: page.id,
                pageTitle: page.title,
                score: 10,
                type: 'page'
              });
            }

            // Search in headings
            for (const heading of headings) {
              if (heading.title.toLowerCase().includes(searchTerm)) {
                // Calculate score based on heading level (h1 = highest score)
                const levelScore = Math.max(1, 7 - heading.level);
                
                // Find content around this heading for excerpt
                const lines = content.split('\n');
                let headingLineIndex = -1;
                for (let i = 0; i < lines.length; i++) {
                  if (lines[i].includes(heading.title)) {
                    headingLineIndex = i;
                    break;
                  }
                }
                
                let excerpt = '';
                if (headingLineIndex !== -1) {
                  // Get a few lines after the heading for context
                  const contextLines = lines.slice(headingLineIndex + 1, headingLineIndex + 4);
                  excerpt = contextLines.join(' ').replace(/[#*`]/g, '').replace(/\s+/g, ' ').trim();
                  if (excerpt.length > 150) {
                    excerpt = excerpt.substring(0, 150) + '...';
                  }
                }

                searchResults.push({
                  sectionId: section.id,
                  sectionTitle: section.title,
                  pageId: page.id,
                  pageTitle: page.title,
                  headingId: heading.id,
                  headingTitle: heading.title,
                  headingLevel: heading.level,
                  excerpt,
                  score: levelScore * 2,
                  type: 'heading'
                });
              }
            }

            // Search in general content (lower priority)
            if (contentLower.includes(searchTerm)) {
              const index = contentLower.indexOf(searchTerm);
              const start = Math.max(0, index - 50);
              const end = Math.min(content.length, index + 100);
              let excerpt = content.slice(start, end).trim();
              
              // Clean up markdown formatting for excerpt
              excerpt = excerpt.replace(/[#*`]/g, '').replace(/\n/g, ' ');
              if (start > 0) excerpt = '...' + excerpt;
              if (end < content.length) excerpt = excerpt + '...';

              // Only add if we don't already have a page result for this page
              const hasPageResult = searchResults.some(r => 
                r.sectionId === section.id && 
                r.pageId === page.id && 
                r.type === 'page'
              );

              if (!hasPageResult) {
                searchResults.push({
                  sectionId: section.id,
                  sectionTitle: section.title,
                  pageId: page.id,
                  pageTitle: page.title,
                  excerpt,
                  score: 3,
                  type: 'page'
                });
              }
            }
          } catch (error) {
            console.warn(`Failed to load content for ${page.file}:`, error);
          }
        }
      }

      // Sort by score (highest first), then by type (headings before pages)
      searchResults.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.type === 'heading' && b.type === 'page') return -1;
        if (a.type === 'page' && b.type === 'heading') return 1;
        return 0;
      });
      
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, config]);

  const handleResultClick = (result: SearchResult) => {
    const path = `/docs/${result.sectionId}/${result.pageId}`;
    const hash = result.headingId ? `#${result.headingId}` : '';
    navigate(path + hash);
    setQuery('');
    setIsOpen(false);
    onResultClick?.();
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  const getResultIcon = (result: SearchResult) => {
    if (result.type === 'heading') {
      const levelChar = result.headingLevel?.toString() || '1';
      return (
        <span className="text-xs font-mono text-gray-500 dark:text-gray-500 light:text-gray-400 mr-2">
          H{levelChar}
        </span>
      );
    }
    return null;
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
                  key={`${result.sectionId}-${result.pageId}-${result.headingId || 'page'}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="flex items-start">
                    {getResultIcon(result)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white dark:text-white light:text-gray-900 truncate">
                        {result.type === 'heading' ? result.headingTitle : result.pageTitle}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">
                        {result.sectionTitle} → {result.pageTitle}
                        {result.type === 'heading' && result.headingTitle !== result.pageTitle && ` → ${result.headingTitle}`}
                      </div>
                      {result.excerpt && (
                        <div className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500 mt-1 line-clamp-2">
                          {result.excerpt}
                        </div>
                      )}
                    </div>
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
