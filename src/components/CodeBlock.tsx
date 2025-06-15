
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
    <div className="relative my-6">
      {filename && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-ai-electric font-mono text-sm bg-gray-800/50 px-3 py-1 rounded-t-md">
            {filename}
          </span>
        </div>
      )}
      <div className="relative group bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 shadow-md"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-300" />
          )}
        </button>
        <pre className="!p-4 !m-0 overflow-x-auto !border-0 bg-gray-800" style={{ backgroundColor: '#1f2937' }}>
          <code className={`language-${language} text-sm leading-relaxed`} style={{ backgroundColor: '#1f2937' }}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
