
import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

interface MarkdownRendererProps {
  content: string;
  toc: Array<{id: string; title: string; level: number}>;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, toc }) => {
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

  return (
    <div className="bg-gray-900/40 dark:bg-gray-900/40 light:bg-white/80 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 backdrop-blur-sm">
      <article className="prose prose-slate dark:prose-invert light:prose-gray max-w-none p-8 lg:p-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => {
              const text = React.Children.toArray(children).join('');
              const id = getHeadingId(text, 1);
              return (
                <h1 {...props} id={id} className="text-4xl md:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-8 border-b border-gray-700/50 dark:border-gray-700/50 light:border-gray-200 pb-6">
                  {children}
                </h1>
              );
            },
            h2: ({ children, ...props }) => {
              const text = React.Children.toArray(children).join('');
              const id = getHeadingId(text, 2);
              return (
                <h2 {...props} id={id} className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mt-16 mb-6 border-l-4 border-ai-electric pl-4">
                  {children}
                </h2>
              );
            },
            h3: ({ children, ...props }) => {
              const text = React.Children.toArray(children).join('');
              const id = getHeadingId(text, 3);
              return (
                <h3 {...props} id={id} className="text-2xl font-semibold text-white dark:text-white light:text-gray-900 mt-12 mb-4">
                  {children}
                </h3>
              );
            },
            h4: ({ children, ...props }) => {
              const text = React.Children.toArray(children).join('');
              const id = getHeadingId(text, 4);
              return (
                <h4 {...props} id={id} className="text-xl font-semibold text-white dark:text-white light:text-gray-900 mt-8 mb-3">
                  {children}
                </h4>
              );
            },
            h5: ({ children, ...props }) => {
              const text = React.Children.toArray(children).join('');
              const id = getHeadingId(text, 5);
              return (
                <h5 {...props} id={id} className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mt-6 mb-2">
                  {children}
                </h5>
              );
            },
            h6: ({ children, ...props }) => {
              const text = React.Children.toArray(children).join('');
              const id = getHeadingId(text, 6);
              return (
                <h6 {...props} id={id} className="text-base font-semibold text-white dark:text-white light:text-gray-900 mt-4 mb-2">
                  {children}
                </h6>
              );
            },
            p: ({ children, ...props }) => (
              <p {...props} className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed mb-6 text-lg">
                {children}
              </p>
            ),
            code: ({ node, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const inline = !match;
              
              if (!inline && match) {
                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={language}
                  />
                );
              }
              return (
                <code 
                  {...props} 
                  className="bg-gray-700 dark:bg-gray-700 light:bg-gray-100 text-ai-electric dark:text-ai-electric light:text-ai-electric px-2 py-1 rounded text-sm font-mono border border-gray-600 dark:border-gray-600 light:border-gray-300"
                >
                  {children}
                </code>
              );
            },
            pre: ({ children, ...props }) => {
              return <>{children}</>;
            },
            blockquote: ({ children, ...props }) => (
              <blockquote 
                {...props} 
                className="border-l-4 border-ai-electric bg-gray-800/30 dark:bg-gray-800/30 light:bg-ai-electric/5 pl-6 py-4 my-6 italic text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-r-lg"
              >
                {children}
              </blockquote>
            ),
            ul: ({ children, ...props }) => (
              <ul {...props} className="list-disc pl-6 space-y-3 text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol {...props} className="list-decimal pl-6 space-y-3 text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
                {children}
              </ol>
            ),
            li: ({ children, ...props }) => (
              <li {...props} className="leading-relaxed text-lg">
                {children}
              </li>
            ),
            a: ({ children, href, ...props }) => (
              <a 
                {...props} 
                href={href}
                className="text-ai-electric hover:text-ai-neon font-medium underline decoration-ai-electric/30 hover:decoration-ai-neon/50 transition-all duration-200 inline-flex items-center gap-1"
              >
                {children}
                {href?.startsWith('http') && <ExternalLink className="h-3 w-3" />}
              </a>
            ),
            table: ({ children, ...props }) => (
              <div className="overflow-x-auto my-8 rounded-lg border border-gray-700 dark:border-gray-700 light:border-gray-200">
                <table {...props} className="min-w-full">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children, ...props }) => (
              <thead {...props} className="bg-gray-800 dark:bg-gray-800 light:bg-gray-50 text-white dark:text-white light:text-gray-900">
                {children}
              </thead>
            ),
            th: ({ children, ...props }) => (
              <th {...props} className="px-6 py-4 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td {...props} className="px-6 py-4 border-t border-gray-700 dark:border-gray-700 light:border-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default MarkdownRenderer;
