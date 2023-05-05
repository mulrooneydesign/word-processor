import { expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Counter from './Counter';

describe('Counter', () => {
  test('should render the Counter', () => {
    render(<Counter title="Count this!" count={100} />);
    expect(screen.getByTestId('counter')).toBeInTheDocument();
  });

  test('should render the count', () => {
    render(<Counter title="Count this!" count={1001} />);
    expect(screen.getByText(/1001/)).toBeInTheDocument();
  });

  test('should render the title', () => {
    render(<Counter title="Count this!" count={1001} />);
    expect(screen.getByText(/Count this!/)).toBeInTheDocument();
  });
});
