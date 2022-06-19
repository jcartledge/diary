import { render, screen } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { withToggles } from "../test/wrappers/withToggles";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders the children if the toggle is enabled", () => {
    const TestComponent = () => <Toggle name="test_feature">Hello</Toggle>;
    render(<TestComponent />, { wrapper: wrap(withToggles(["test_feature"])) });
    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("does not render the children if the toggle is not enabled", () => {
    const TestComponent = () => <Toggle name="test_feature">Hello</Toggle>;
    render(<TestComponent />, { wrapper: wrap(withToggles([])) });
    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("does not render the children when the toggle is enabled and toggle is off", () => {
    const TestComponent = () => (
      <Toggle isOff name="test_feature">
        Hello
      </Toggle>
    );
    render(<TestComponent />, { wrapper: wrap(withToggles(["test_feature"])) });
    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("renders the children when the toggle is not enabled and toggle is off", () => {
    const TestComponent = () => (
      <Toggle isOff name="test_feature">
        Hello
      </Toggle>
    );
    render(<TestComponent />, { wrapper: wrap(withToggles([])) });
    expect(screen.queryByText("Hello")).not.toBeNull();
  });
});
