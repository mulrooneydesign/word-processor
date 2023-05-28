import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useEffect, useState } from 'react';
import './TextArea.css';

import { useMarkdownStore } from '../../store/store';

import Minimizer from '../Footer/Minimizer/Minimizer';
import Counter from '../Footer/Counter/Counter';
import Footer from '../Footer/Footer';
import TypingIndicator from '../Footer/TypingIndicator/TypingIndicator';

import Tooltip from '../Tooltip/Tooltip';

import { Position } from '../Tooltip/Tooltip';

export default function TextArea() {
  const [isTyping, setIsTyping] = useState(false);

  const markdown = useMarkdownStore((state) => state.markdown);
  const setMarkdown = useMarkdownStore((state) => state.setMarkdown);
  const currentFile = useMarkdownStore((state) => state.currentFile);

  const textAreaIsOpen = useMarkdownStore((state) => state.textAreaIsOpen);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    const target = event.target;

    if (target === null) {
      throw new Error('target can not be null');
    }

    setMarkdown(target.value);

    setTimeout(() => setIsTyping(false), 1000);
  };

  useEffect(() => {
    if (currentFile) {
      setMarkdown(currentFile);
    }
  }, [currentFile, setMarkdown]);

  return (
    <>
      <div className="markDownContainer">
        <div data-testid="markDownContainer">
          <ReactMarkdown
            children={markdown}
            components={{
              code({ inline, className, children, ...props }) {
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
          className={textAreaIsOpen ? 'textArea' : 'textArea textAreaHidden'}
          placeholder="Type here..."
          onChange={onChangeHandler}
          value={markdown}
        />
      </div>

      <Footer>
        <Tooltip text="Character count" position={Position.TOP}>
          <Counter title="Characters: " count={markdown.length} />
        </Tooltip>
        <Tooltip text="Word count" position={Position.TOP}>
          <Counter title="Words: " count={markdown.split(' ').length} />
        </Tooltip>
        <TypingIndicator isTyping={isTyping} />
        <Tooltip text="Minimize" position={Position.TOP}>
          <Minimizer />
        </Tooltip>
      </Footer>
    </>
  );
}
