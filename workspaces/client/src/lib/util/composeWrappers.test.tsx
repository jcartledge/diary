import React from "react";
import { describe, expect, it } from "vitest";
import { composeWrappers } from "./composeWrappers";
import { render, screen } from "@testing-library/react";

describe("composeWrappers", () => {
  it("renders content when no wrappers are provided to composeWrappers", () => {
    render(<>test content</>, { wrapper: composeWrappers() });

    expect(screen.getByText("test content")).not.toBe(null);
  });

  it("returns the component when provided a single component", () => {
    const TestComponent: React.FC<React.PropsWithChildren> = ({ children }) => (
      <div data-testid="wrapper">{children}</div>
    );

    render(<>some content</>, { wrapper: composeWrappers(TestComponent) });

    expect(screen.getByTestId("wrapper")).toHaveTextContent("some content");
  });

  it("composes the components from outside in", () => {
    const OuterComponent: React.FC<React.PropsWithChildren> = ({
      children,
    }) => (
      <div data-testid="outer">
        <>[Outer]</> {children}
      </div>
    );
    const InnerComponent: React.FC<React.PropsWithChildren> = ({
      children,
    }) => (
      <>
        <>[Inner]</> {children}
      </>
    );

    render(<>[children]</>, {
      wrapper: composeWrappers(OuterComponent, InnerComponent),
    });

    expect(screen.getByTestId("outer")).toHaveTextContent(
      "[Outer] [Inner] [children]",
    );
  });
});
