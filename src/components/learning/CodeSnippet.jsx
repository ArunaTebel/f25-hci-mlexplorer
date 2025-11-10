import React, { useEffect, useRef } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';

const CodeSnippet = ({ code, language = 'python' }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
        <span className="text-sm text-gray-300 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <FiCheck className="h-4 w-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy className="h-4 w-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeSnippet;

