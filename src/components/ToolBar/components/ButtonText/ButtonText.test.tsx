import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import ButtonText from './ButtonText';

describe('ButtonText', () => {
  test('should render the button', () => {
    render(<ButtonText text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
