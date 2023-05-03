import { describe, expect, it as test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import { Alien } from 'phosphor-react';

const mockHandler = vi.fn();

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

  test('should call the handler function when clicked', () => {
    render(
      <Button icon={Alien} text="Hello Alien Icon!" handler={mockHandler} />
    );
    screen.getByText('Hello Alien Icon!').click();
    expect(mockHandler).toHaveBeenCalled();
  });
});
