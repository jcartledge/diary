import { render, screen } from "@testing-library/react";
import {
  withToggle,
  withToggles,
} from "lib/toggles/TogglesProvider.testWrapper";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders the children if the toggle is enabled", () => {
    render(<Toggle name="test_feature">Hello</Toggle>, {
      wrapper: wrap(withToggle("test_feature")),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render the children if the toggle is not enabled", () => {
    render(<Toggle name="test_feature">Hello</Toggle>, {
      wrapper: wrap(withToggles()),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does not render the children when the toggle is enabled and isOff is passed", () => {
    render(
      <Toggle isOff name="test_feature">
        Hello
      </Toggle>,
      { wrapper: wrap(withToggle("test_feature")) }
    );

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders the children when the toggle is not enabled and isOff is passed", () => {
    render(
      <Toggle isOff name="test_feature">
        Hello
      </Toggle>,
      { wrapper: wrap(withToggles()) }
    );

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("renders the fallback when the toggle is not enabled", () => {
    const Fallback = () => <>Off!</>;
    render(
      <Toggle name="test_feature" fallback={Fallback}>
        Hello
      </Toggle>,
      { wrapper: wrap(withToggles()) }
    );

    expect(screen.queryByText("Off!")).toBeInTheDocument();
  });

  it("renders the fallback when the toggle is enabled and isOff is passed", () => {
    const Fallback = () => <>On!</>;
    render(
      <Toggle isOff name="test_feature" fallback={Fallback}>
        Hello
      </Toggle>,
      { wrapper: wrap(withToggle("test_feature")) }
    );

    expect(screen.queryByText("On!")).toBeInTheDocument();
  });
});
