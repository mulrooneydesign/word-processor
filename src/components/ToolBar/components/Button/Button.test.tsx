import { describe, expect, it as test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Button from './Button';
import { Alien } from 'phosphor-react';

describe('Button', () => {
  test('should render the button', () => {
    render(<Button icon={Alien} text="Hello Alien Icon!" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should render the text and icon', () => {
    render(<Button icon={Alien} text="Hello Alien Icon!" />);
    expect(screen.getByText('Hello Alien Icon!')).toBeInTheDocument();
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('should render only the icon when no text is provided', () => {
    render(<Button icon={Alien} />);
    expect(screen.queryByText('Hello Alien Icon!')).not.toBeInTheDocument();
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('should render only the text when no icon is provided', () => {
    render(<Button text="Hello Alien Icon!" />);
    expect(screen.getByText('Hello Alien Icon!')).toBeInTheDocument();
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });
});
