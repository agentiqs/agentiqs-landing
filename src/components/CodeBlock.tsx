
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/components/prism-python';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = 'python', filename }: CodeBlockProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="relative">
      {filename && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-ai-neon font-mono text-sm">{filename}</span>
        </div>
      )}
      <pre className="!bg-transparent !p-0 !m-0 overflow-x-auto">
        <code className={`language-${language} !bg-transparent text-sm leading-relaxed`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
