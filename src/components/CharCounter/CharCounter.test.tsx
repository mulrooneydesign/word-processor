import { expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import CharCounter from './CharCounter';

describe('CharCounter', () => {
  test('should render the CharCounter', () => {
    render(<CharCounter charCount={100} />);
    expect(screen.getByTestId('charCounter')).toBeInTheDocument();
  });

  test('should render the charCount', () => {
    render(<CharCounter charCount={1001} />);
    expect(screen.getByText(/1001/)).toBeInTheDocument();
  });
});
