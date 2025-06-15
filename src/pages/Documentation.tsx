import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ChevronLeft, ChevronRight, Menu, BookOpen, Home } from 'lucide-react';
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
import 'highlight.js/styles/github.css';

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
    <div className="space-y-2">
      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
        On This Page
      </h4>
      <nav className="space-y-1">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleTocClick(e, item.id)}
            className={`block text-sm transition-colors border-l-2 pl-3 py-1 ${
              activeId === item.id
                ? 'border-primary text-primary font-medium'
                : 'border-transparent hover:text-foreground hover:border-muted-foreground'
            } ${
              item.level === 1 ? '' : 
              item.level === 2 ? 'ml-3 text-muted-foreground' : 
              'ml-6 text-muted-foreground'
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
    navigate(`/docs/${sectionId}/${pageId}`);
    onItemClick?.();
  };

  return (
    <ScrollArea className="h-full py-6 px-4">
      <div className="space-y-6">
        <div>
          <Link to="/" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">{config.title}</h3>
          <nav className="space-y-4">
            {config.sections.map((section, sectionIndex) => (
              <div key={section.id}>
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-2">
                  {config.navigation.showSectionNumbers && `${sectionIndex + 1}. `}
                  {section.title}
                </h4>
                <ul className="space-y-1 ml-2">
                  {section.pages.map((page, pageIndex) => (
                    <li key={page.id}>
                      <button
                        onClick={() => handlePageClick(section.id, page.id)}
                        className={`w-full text-left text-sm px-2 py-1 rounded hover:bg-accent transition-colors ${
                          currentSectionId === section.id && currentPageId === page.id
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground'
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
    <div className="flex justify-between items-center mt-12 pt-8 border-t">
      <div className="flex-1">
        {previous && (
          <Link
            to={`/docs/${previous.section.id}/${previous.page.id}`}
            className="group flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <div>
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="group-hover:underline">{previous.page.title}</div>
            </div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 text-right">
        {next && (
          <Link
            to={`/docs/${next.section.id}/${next.page.id}`}
            className="group flex items-center justify-end space-x-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <div>
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="group-hover:underline">{next.page.title}</div>
            </div>
            <ChevronRight className="h-4 w-4" />
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-8 w-8 animate-pulse mx-auto mb-4" />
          <p>Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/">
              <Button>Return Home</Button>
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
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden border-b">
        <div className="flex items-center justify-between p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <Sidebar
                config={config}
                currentSectionId={sectionId}
                currentPageId={pageId}
                onItemClick={() => {}}
              />
            </SheetContent>
          </Sheet>
          <h1 className="font-semibold">Documentation</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r bg-muted/10">
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
                <Breadcrumb className="mb-6">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{pageInfo.section.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{pageInfo.page.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}

              {/* Content */}
              <article className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children, ...props }) => {
                      const text = React.Children.toArray(children).join('');
                      const id = getHeadingId(text, 1);
                      return (
                        <h1 {...props} id={id}>
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ children, ...props }) => {
                      const text = React.Children.toArray(children).join('');
                      const id = getHeadingId(text, 2);
                      return (
                        <h2 {...props} id={id}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const text = React.Children.toArray(children).join('');
                      const id = getHeadingId(text, 3);
                      return (
                        <h3 {...props} id={id}>
                          {children}
                        </h3>
                      );
                    },
                    h4: ({ children, ...props }) => {
                      const text = React.Children.toArray(children).join('');
                      const id = getHeadingId(text, 4);
                      return (
                        <h4 {...props} id={id}>
                          {children}
                        </h4>
                      );
                    },
                    h5: ({ children, ...props }) => {
                      const text = React.Children.toArray(children).join('');
                      const id = getHeadingId(text, 5);
                      return (
                        <h5 {...props} id={id}>
                          {children}
                        </h5>
                      );
                    },
                    h6: ({ children, ...props }) => {
                      const text = React.Children.toArray(children).join('');
                      const id = getHeadingId(text, 6);
                      return (
                        <h6 {...props} id={id}>
                          {children}
                        </h6>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>

              {/* Page Navigation */}
              <PageNavigation previous={navigation.previous} next={navigation.next} />
            </div>
          </main>

          {/* Table of Contents - Desktop */}
          {config.theme.showTableOfContents && toc.length > 0 && (
            <aside className="hidden xl:block w-64 border-l bg-muted/10">
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
