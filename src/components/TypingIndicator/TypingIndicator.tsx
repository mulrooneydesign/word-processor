import './TypingIndicator.css';

export default function TypingIndicator({ isTyping }: { isTyping: boolean }) {
  return (
    <p
      className={!isTyping ? 'typingHidden' : 'typing'}
      data-testid="typingIndicator">
      Typing...
    </p>
  );
}
