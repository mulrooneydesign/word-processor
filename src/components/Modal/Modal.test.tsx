import { describe, expect, it as test, vi } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';

import { Modal } from './Modal';

const mockhandler = vi.fn();

describe('Modal', () => {
  test('should render the Modal', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('should render the save button', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('should render the modal title', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  test('should render the modal subtitle title', () => {
    render(
      <Modal
        title="Modal Title"
        subtitle="Modal subtitle"
        handler={mockhandler}
      />
    );
    expect(screen.getByText('Modal subtitle')).toBeInTheDocument();
  });

  test('should call the handler function when save is clicked', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);

    const input = screen.getByTestId('modalInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    screen.getByText('Save').click();
    expect(mockhandler).toHaveBeenCalled();
  });

  test('should render the close button', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    expect(screen.getByTestId('modalClose')).toBeInTheDocument();
  });

  test('should call the handler function when close is clicked', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    screen.getByTestId('modalClose').click();
    expect(mockhandler).toHaveBeenCalled();
  });

  test('should render the input', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    const modal = screen.getByTestId('modal');
    expect(within(modal).getByTestId('modalInput')).toBeInTheDocument();
  });

  test('should focus the input', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    const modal = screen.getByTestId('modal');
    expect(within(modal).getByTestId('modalInput')).toHaveFocus();
  });

  test('should call the handler function when enter is pressed', () => {
    render(<Modal title="Modal Title" handler={mockhandler} />);
    screen.getByTestId('modal').focus();
    screen
      .getByTestId('modal')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(mockhandler).toHaveBeenCalled();
  });
});
