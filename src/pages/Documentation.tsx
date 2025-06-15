
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import DocumentationHeader from '@/components/documentation/DocumentationHeader';
import Sidebar from '@/components/documentation/Sidebar';
import MarkdownRenderer from '@/components/documentation/MarkdownRenderer';
import PageNavigation from '@/components/documentation/PageNavigation';
import DocumentationSidebar from '@/components/documentation/DocumentationSidebar';
import {
  loadDocConfig,
  loadMarkdownContent,
  generateTableOfContents,
  findPage,
  getPageNavigation,
  type DocConfig
} from '@/utils/docLoader';

const Documentation: React.FC = () => {
  const { sectionId, pageId } = useParams<{ sectionId?: string; pageId?: string }>();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<DocConfig | null>(null);
  const [content, setContent] = useState<string>('');
  const [toc, setToc] = useState<Array<{id: string; title: string; level: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-ai-blue dark:via-gray-900 dark:to-ai-blue flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 animate-pulse mx-auto mb-6 text-blue-600 dark:text-ai-electric" />
          <p className="text-xl text-gray-900 dark:text-white font-medium">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-ai-blue dark:via-gray-900 dark:to-ai-blue flex items-center justify-center">
        <Card className="max-w-md shadow-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{error}</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-ai-electric dark:hover:bg-ai-electric/80 text-white font-medium px-6 py-2">Return Home</Button>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-ai-blue dark:via-gray-900 dark:to-ai-blue">
      {/* Mobile Header */}
      <DocumentationHeader 
        config={config}
        currentSectionId={sectionId}
        currentPageId={pageId}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/30 backdrop-blur-md">
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
                <div className="mb-8 p-4 bg-white/60 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700/50">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-ai-electric transition-colors">
                          Home
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600" />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-ai-electric transition-colors">
                          Documentation
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-blue-600 dark:text-ai-electric font-medium">
                          {pageInfo.section.title}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">
                          {pageInfo.page.title}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              )}

              {/* Content */}
              <MarkdownRenderer content={content} toc={toc} />

              {/* Page Navigation */}
              <div className="mt-8">
                <PageNavigation previous={navigation.previous} next={navigation.next} />
              </div>
            </div>
          </main>

          {/* Right Sidebar - Search & Table of Contents */}
          <DocumentationSidebar config={config} toc={toc} />
        </div>
      </div>
    </div>
  );
};

export default Documentation;
