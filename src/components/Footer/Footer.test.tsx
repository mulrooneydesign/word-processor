import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer', () => {
  test('should render the footer', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('should render the children', () => {
    render(<Footer>Children</Footer>);
    expect(screen.getByText(/Children/)).toBeInTheDocument();
  });
});
