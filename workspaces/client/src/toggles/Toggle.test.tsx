import { render, screen } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { withToggles } from "../test/wrappers/withToggles";
import { Toggle } from "./Toggle";
import { FeatureToggles } from "./toggles.types";

describe("Toggle", () => {
  it("renders the children if the toggle is enabled", () => {
    const toggles = ["FEATURE_1"];
    const TestComponent = () => <Toggle name="FEATURE_1">Hello</Toggle>;
    render(<TestComponent />, { wrapper: wrap(withToggles(toggles)) });

    expect(screen.getByText("Hello")).not.toBeNull();
  });

  it("does not render the children if the toggle is not enabled", () => {
    const toggles: FeatureToggles = [];
    const TestComponent = () => <Toggle name="FEATURE_1">Hello</Toggle>;
    render(<TestComponent />, { wrapper: wrap(withToggles(toggles)) });

    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("does not render the children when the toggle is enabled and is=false", () => {
    const toggles = ["FEATURE_1"];
    const TestComponent = () => (
      <Toggle name="FEATURE_1" is={false}>
        Hello
      </Toggle>
    );
    render(<TestComponent />, { wrapper: wrap(withToggles(toggles)) });

    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("renders the children when the toggle is not enabled and is=false", () => {
    const toggles: FeatureToggles = [];
    const TestComponent = () => (
      <Toggle name="FEATURE_1" is={false}>
        Hello
      </Toggle>
    );
    render(<TestComponent />, { wrapper: wrap(withToggles(toggles)) });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });
});
