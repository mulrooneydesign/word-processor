/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, it as test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Tooltip from './Tooltip';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

const TestChildComponent = () => {
  return <div>Test</div>;
};

describe('Tooltip', () => {
  test('should render the tooltip with children', () => {
    render(
      <Tooltip text="Hover text">
        <TestChildComponent />
      </Tooltip>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('should render the tooltip with text', () => {
    render(<Tooltip text="Hover text">Hover me</Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Hover text')).toBeInTheDocument();
  });

  test('should render the tooltip with text after on mouseEnter', () => {
    render(<Tooltip text="Hover text">Hover me</Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Hover text')).toBeInTheDocument();
  });

  test('should not render the tooltip with text after on mouseLeave', () => {
    render(<Tooltip text="Hover text">Hover me</Tooltip>);

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Hover text')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(screen.queryByText('Hover text')).not.toBeInTheDocument();
  });
});
