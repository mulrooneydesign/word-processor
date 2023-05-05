import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Minimizer from './Minimizer';

describe('Minimizer', () => {
  test('should render the minimizer', () => {
    render(<Minimizer />);
    expect(screen.getByTestId('minimizer')).toBeInTheDocument();
  });

  test('should render the arrow', () => {
    render(<Minimizer />);
    expect(screen.getByTestId('arrow')).toBeInTheDocument();
  });
});
