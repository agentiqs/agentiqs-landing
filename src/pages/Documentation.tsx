
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, Menu, BookOpen, Home } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
  loadDocConfig,
  loadMarkdownContent,
  generateTableOfContents,
  findPage,
  getPageNavigation,
  type DocConfig,
  type DocSection,
  type DocPage
} from '@/utils/docLoader';

// Import highlight.js styles
// import 'highlight.js/styles/github.css';

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
      <h4 className="font-semibold text-sm uppercase tracking-wide text-white">
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

interface PageNavigationProps {
  previous: { section: DocSection; page: DocPage } | null;
  next: { section: DocSection; page: DocPage } | null;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ previous, next }) => {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
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

const Documentation: React.FC = () => {
  const { sectionId, pageId } = useParams<{ sectionId?: string; pageId?: string }>();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<DocConfig | null>(null);
  const [content, setContent] = useState<string>('');
  const [toc, setToc] = useState<Array<{id: string; title: string; level: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Counters for duplicate headings - reset when content changes
  const headingCounters = useRef<Record<string, number>>({});

  const getHeadingId = (text: string, level: number): string => {
    const key = `${level}-${text}`;
    const currentCount = headingCounters.current[key] || 0;
    headingCounters.current[key] = currentCount + 1;
    
    const matchingItems = toc.filter(item => item.title === text && item.level === level);
    const tocItem = matchingItems[currentCount];
    
    return tocItem?.id || text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  };

  useEffect(() => {
    loadDocConfig()
      .then(setConfig)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!config) return;

    // If no section/page specified, redirect to first page
    if (!sectionId || !pageId) {
      const firstSection = config.sections[0];
      const firstPage = firstSection?.pages[0];
      if (firstSection && firstPage) {
        navigate(`/docs/${firstSection.id}/${firstPage.id}`, { replace: true });
      }
      return;
    }

    const pageInfo = findPage(config, sectionId, pageId);
    if (!pageInfo) {
      setError('Page not found');
      return;
    }

    // Reset scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setLoading(true);
    loadMarkdownContent(pageInfo.page.file)
      .then((markdown) => {
        setContent(markdown);
        if (config.theme.showTableOfContents) {
          const tocData = generateTableOfContents(markdown, config.theme.maxTocDepth);
          setToc(tocData);
        }
        // Reset heading counters for new content
        headingCounters.current = {};
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [config, sectionId, pageId, navigate]);

  // Handle fragment navigation after content loads
  useEffect(() => {
    if (!loading && toc.length > 0) {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash) {
        // Small delay to ensure the DOM is updated
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    }
  }, [loading, toc]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ai-blue flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 animate-pulse mx-auto mb-6 text-ai-electric" />
          <p className="text-xl text-white font-medium">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ai-blue flex items-center justify-center">
        <Card className="max-w-md shadow-xl border border-gray-700 bg-gray-800">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Error</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">{error}</p>
            <Link to="/">
              <Button className="bg-ai-electric hover:bg-ai-electric/80 text-white font-medium px-6 py-2">Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!config || !sectionId || !pageId) return null;

  const pageInfo = findPage(config, sectionId, pageId);
  const navigation = getPageNavigation(config, sectionId, pageId);

  return (
    <div className="min-h-screen bg-ai-blue">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-gray-900 border-gray-700">
              <Sidebar
                config={config}
                currentSectionId={sectionId}
                currentPageId={pageId}
                onItemClick={() => {}}
              />
            </SheetContent>
          </Sheet>
          <h1 className="font-semibold text-white">Documentation</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r border-gray-700 bg-gray-900/50 backdrop-blur-sm">
          <div className="sticky top-0 h-screen">
            <Sidebar
              config={config}
              currentSectionId={sectionId}
              currentPageId={pageId}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <main className="flex-1 max-w-4xl">
            <div className="p-6 lg:p-8">
              {/* Breadcrumbs */}
              {pageInfo && (
                <Breadcrumb className="mb-8">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-gray-400 hover:text-ai-electric">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-600" />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/docs" className="text-gray-400 hover:text-ai-electric">Documentation</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-600" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white font-medium">{pageInfo.section.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-600" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white font-medium">{pageInfo.page.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}

              {/* Content */}
              <div className="bg-gray-900/50 rounded-lg shadow-xl overflow-hidden border border-gray-700 backdrop-blur-sm">
                <article className="prose prose-slate dark:prose-invert max-w-none p-8">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children, ...props }) => {
                        const text = React.Children.toArray(children).join('');
                        const id = getHeadingId(text, 1);
                        return (
                          <h1 {...props} id={id} className="text-4xl md:text-5xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                            {children}
                          </h1>
                        );
                      },
                      h2: ({ children, ...props }) => {
                        const text = React.Children.toArray(children).join('');
                        const id = getHeadingId(text, 2);
                        return (
                          <h2 {...props} id={id} className="text-3xl font-bold text-white mt-12 mb-6">
                            {children}
                          </h2>
                        );
                      },
                      h3: ({ children, ...props }) => {
                        const text = React.Children.toArray(children).join('');
                        const id = getHeadingId(text, 3);
                        return (
                          <h3 {...props} id={id} className="text-2xl font-semibold text-white mt-10 mb-4">
                            {children}
                          </h3>
                        );
                      },
                      h4: ({ children, ...props }) => {
                        const text = React.Children.toArray(children).join('');
                        const id = getHeadingId(text, 4);
                        return (
                          <h4 {...props} id={id} className="text-xl font-semibold text-white mt-8 mb-3">
                            {children}
                          </h4>
                        );
                      },
                      h5: ({ children, ...props }) => {
                        const text = React.Children.toArray(children).join('');
                        const id = getHeadingId(text, 5);
                        return (
                          <h5 {...props} id={id} className="text-lg font-semibold text-white mt-6 mb-2">
                            {children}
                          </h5>
                        );
                      },
                      h6: ({ children, ...props }) => {
                        const text = React.Children.toArray(children).join('');
                        const id = getHeadingId(text, 6);
                        return (
                          <h6 {...props} id={id} className="text-base font-semibold text-white mt-4 mb-2">
                            {children}
                          </h6>
                        );
                      },
                      p: ({ children, ...props }) => (
                        <p {...props} className="text-gray-300 leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      code: ({ node, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        const inline = !match;
                        
                        if (!inline && match) {
                          return (
                            <div className="my-6">
                              <CodeBlock
                                code={String(children).replace(/\n$/, '')}
                                language={language}
                              />
                            </div>
                          );
                        }
                        return (
                          <code 
                            {...props} 
                            className="bg-gray-800 text-ai-electric px-2 py-1 rounded text-sm font-mono"
                          >
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children, ...props }) => {
                        // This will be handled by the code component above
                        return <>{children}</>;
                      },
                      blockquote: ({ children, ...props }) => (
                        <blockquote 
                          {...props} 
                          className="border-l-4 border-ai-electric bg-gray-800/50 pl-6 py-2 my-6 italic text-gray-300"
                        >
                          {children}
                        </blockquote>
                      ),
                      ul: ({ children, ...props }) => (
                        <ul {...props} className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children, ...props }) => (
                        <ol {...props} className="list-decimal pl-6 space-y-2 text-gray-300 mb-4">
                          {children}
                        </ol>
                      ),
                      li: ({ children, ...props }) => (
                        <li {...props} className="leading-relaxed">
                          {children}
                        </li>
                      ),
                      a: ({ children, href, ...props }) => (
                        <a 
                          {...props} 
                          href={href}
                          className="text-ai-electric hover:text-ai-neon font-medium underline decoration-ai-electric/30 hover:decoration-ai-neon/50 transition-colors"
                        >
                          {children}
                        </a>
                      ),
                      table: ({ children, ...props }) => (
                        <div className="overflow-x-auto my-6">
                          <table {...props} className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children, ...props }) => (
                        <thead {...props} className="bg-gray-800 text-white">
                          {children}
                        </thead>
                      ),
                      th: ({ children, ...props }) => (
                        <th {...props} className="px-4 py-3 text-left font-semibold">
                          {children}
                        </th>
                      ),
                      td: ({ children, ...props }) => (
                        <td {...props} className="px-4 py-3 border-t border-gray-700 text-gray-300">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              </div>

              {/* Page Navigation */}
              <div className="mt-8">
                <PageNavigation previous={navigation.previous} next={navigation.next} />
              </div>
            </div>
          </main>

          {/* Table of Contents - Desktop */}
          {config.theme.showTableOfContents && toc.length > 0 && (
            <aside className="hidden xl:block w-64 border-l border-gray-700 bg-gray-900/50 backdrop-blur-sm">
              <div className="sticky top-0 h-screen overflow-auto p-6">
                <TableOfContents toc={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
