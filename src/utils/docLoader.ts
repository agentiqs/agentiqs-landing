import yaml from 'yaml';
import { docFiles } from './docFiles';

export interface DocPage {
  id: string;
  title: string;
  file: string;
}

export interface DocSection {
  id: string;
  title: string;
  description: string;
  pages: DocPage[];
}

export interface DocConfig {
  title: string;
  description: string;
  sections: DocSection[];
  navigation: {
    showSectionNumbers: boolean;
    showPageNumbers: boolean;
    collapsible: boolean;
  };
  theme: {
    highlightLanguage: string;
    showTableOfContents: boolean;
    maxTocDepth: number;
  };
}

// Cache for loaded content
const configCache = new Map<string, DocConfig>();

/**
 * Load and parse the documentation configuration
 */
export async function loadDocConfig(): Promise<DocConfig> {
  const cacheKey = 'doc-config';
  
  if (configCache.has(cacheKey)) {
    return configCache.get(cacheKey)!;
  }

  try {
    const yamlText = docFiles['config.yaml'];
    const config = yaml.parse(yamlText) as DocConfig;
    
    configCache.set(cacheKey, config);
    return config;
  } catch (error) {
    console.error('Failed to load documentation config:', error);
    throw new Error('Could not load documentation configuration');
  }
}

/**
 * Load markdown content for a specific page
 */
export async function loadMarkdownContent(filePath: string): Promise<string> {
  try {
    const content = docFiles[filePath as keyof typeof docFiles];
    if (!content) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Remove the file path comment if it exists
    const cleanContent = content.replace(/^<!--[^>]*-->\s*/m, '');
    
    return cleanContent;
  } catch (error) {
    console.error(`Failed to load markdown content from ${filePath}:`, error);
    return `# Error loading content\n\nCould not load content from ${filePath}`;
  }
}

/**
 * Generate table of contents from markdown content
 */
export function generateTableOfContents(content: string, maxDepth: number = 3): Array<{id: string; title: string; level: number}> {
  const toc: Array<{id: string; title: string; level: number}> = [];
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
      if (level <= maxDepth) {
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
        
        toc.push({ id, title, level });
      }
    }
  }
  
  return toc;
}

/**
 * Find a page by section and page ID
 */
export function findPage(config: DocConfig, sectionId: string, pageId: string): { section: DocSection; page: DocPage } | null {
  const section = config.sections.find(s => s.id === sectionId);
  if (!section) return null;
  
  const page = section.pages.find(p => p.id === pageId);
  if (!page) return null;
  
  return { section, page };
}

/**
 * Get navigation info for a page (previous/next)
 */
export function getPageNavigation(config: DocConfig, sectionId: string, pageId: string) {
  const allPages: Array<{ section: DocSection; page: DocPage }> = [];
  
  // Flatten all pages in order
  config.sections.forEach(section => {
    section.pages.forEach(page => {
      allPages.push({ section, page });
    });
  });
  
  const currentIndex = allPages.findIndex(
    item => item.section.id === sectionId && item.page.id === pageId
  );
  
  if (currentIndex === -1) return { previous: null, next: null };
  
  return {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };
}
