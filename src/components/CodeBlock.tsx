
import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/components/prism-python';

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
      <div className="relative group">
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
        <pre className="!bg-transparent !p-4 !m-0 overflow-x-auto !border-0">
          <code className={`language-${language} !bg-transparent text-sm leading-relaxed`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
