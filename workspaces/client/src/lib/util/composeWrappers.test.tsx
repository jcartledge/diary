import React from 'react';
import { describe, expect, it } from 'vitest';
import { composeWrappers } from './composeWrappers';
import { render, screen } from '@testing-library/react';

describe('composeWrappers', () => {
  it('returns the component when provided a single component', () => {
    const TestComponent: React.FC<React.PropsWithChildren> = ({ children }) => (<div data-testid="wrapper">{children}</div>);
    const Composed = composeWrappers(TestComponent);

    render(<Composed>some content</Composed>);

    expect(screen.getByTestId('wrapper')).toHaveTextContent('some content');
  });


  it('composes the components from outside in', () => {
    const OuterComponent: React.FC<React.PropsWithChildren> = ({ children }) => (<div data-testid="outer"><>[Outer]</> {children}</div>);
    const InnerComponent: React.FC<React.PropsWithChildren> = ({ children }) => (<><>[Inner]</> {children}</>);
    const Composed = composeWrappers(OuterComponent, InnerComponent);

    render(<Composed>[children]</Composed>);

    expect(screen.getByTestId('outer')).toHaveTextContent('[Outer] [Inner] [children]');
  })
});
