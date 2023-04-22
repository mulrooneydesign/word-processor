import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useState } from 'react';
import './TextArea.css';

export default function TextArea() {
  const [isTyping, setIsTyping] = useState(false);
  const [markdown, setMarkdown] = useState('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    const target = event.target;

    if (target === null) {
      throw new Error('target can not be null');
    }

    setMarkdown(target.value);

    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="container">
      <div data-testid="markDownContainer">
        <ReactMarkdown
          children={markdown}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      <textarea
        data-testid="textarea"
        className="textArea"
        placeholder="Type here..."
        onChange={onChangeHandler}
      />
      <p data-testid="typing">{isTyping ? ' Typing...' : 'Type it up!'}</p>
    </div>
  );
}
