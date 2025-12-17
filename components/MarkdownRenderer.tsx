import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-2 mt-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-lg font-bold text-blue-200 mb-2 mt-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-md font-bold text-emerald-300 mb-1 mt-2" {...props} />,
          p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-slate-300" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 mb-4 space-y-1 text-slate-300" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-4 mb-4 space-y-1 text-slate-300" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
          code: ({node, inline, className, children, ...props}: any) => {
            return !inline ? (
              <div className="relative group">
                <pre className="bg-slate-900 border border-slate-700 p-3 rounded-lg overflow-x-auto my-3 text-xs font-mono text-blue-100 shadow-inner">
                    <code className={className} {...props}>{children}</code>
                </pre>
              </div>
            ) : (
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono text-amber-200 border border-slate-700" {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-4 bg-blue-900/10 italic text-slate-400 rounded-r" {...props} />
          ),
          a: ({node, ...props}) => (
            <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;