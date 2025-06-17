
import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/components/prism-python';
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-bash";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = 'python', filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative">
      {filename && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-ai-neon font-mono text-sm">{filename}</span>
        </div>
      )}
      <div className="relative group bg-ai-blue rounded-md">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors opacity-0 group-hover:opacity-100 z-10"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-white" />
          )}
        </button>
        <pre className="!p-4 !m-0 overflow-x-auto !border-0 rounded-md" style={{ backgroundColor: '#1e1e1e' }}>
          <code className={`language-${language} text-sm leading-relaxed`} style={{ backgroundColor: '#1e1e1e' }}>
            {code}
          </code>
        </pre>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #6a9955 !important;
            font-style: italic !important;
          }
          .token.string {
            color: #ce9178 !important;
          }
          .token.keyword {
            color: #569cd6 !important;
            font-weight: normal !important;
          }
          .token.function {
            color: #dcdcaa !important;
          }
          .token.number {
            color: #b5cea8 !important;
          }
          .token.operator {
            color: #d4d4d4 !important;
          }
          .token.punctuation {
            color: #d4d4d4 !important;
          }
          .token.builtin,
          .token.class-name {
            color: #4ec9b0 !important;
          }
          .token.decorator {
            color: #569cd6 !important;
          }
          .token.boolean {
            color: #569cd6 !important;
          }
          .token.variable {
            color: #9cdcfe !important;
          }
          code[class*="language-"] {
            color: #d4d4d4 !important;
            background: #1e1e1e !important;
          }
          pre[class*="language-"] {
            background: #1e1e1e !important;
          }
        `
      }} />
    </div>
  );
};

export default CodeBlock;
