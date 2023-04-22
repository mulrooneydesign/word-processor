import { render, screen } from '@testing-library/react';
import { describe, expect, it as test } from 'vitest';
import App from './App';

describe('App', () => {
  test('should render the header', () => {
    render(<App />);
    expect(screen.getByText('Markdown')).toBeInTheDocument();
  });

  test('should render the toolbar', () => {
    render(<App />);
    expect(screen.getByTestId('toolBar')).toBeInTheDocument();
  });
});
