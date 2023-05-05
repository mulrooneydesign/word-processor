import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import TypingIndicator from './TypingIndicator';

describe('TypingIndicator', () => {
  test('should render the typing indicator', () => {
    render(<TypingIndicator isTyping={false} />);
    expect(screen.getByTestId('typingIndicator')).toBeInTheDocument();
  });

  test('typing indicator should be hidden when isTyping is false', () => {
    render(<TypingIndicator isTyping={false} />);
    expect(screen.getByTestId('typingIndicator')).toHaveClass('typingHidden');
  });
});
