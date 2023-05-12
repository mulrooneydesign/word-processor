/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, it as test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Tooltip from './Tooltip';

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

  test('should render the tooltip with text after on mouseEnter', () => {
    render(
      <Tooltip text="Hover text">
        <TestChildComponent />
      </Tooltip>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByText('Test'));
    expect(screen.getByText('Hover text')).toBeInTheDocument();
  });

  test('should not render the tooltip with text after on mouseLeave', () => {
    render(
      <Tooltip text="Hover text">
        <TestChildComponent />
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Test'));
    expect(screen.getByText('Hover text')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Test'));
    expect(screen.queryByText('Hover text')).not.toBeInTheDocument();
  });
});
