import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TogglesProvider } from "./TogglesProvider";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("returns the requested toggle from the provider", () => {
    const TestComponent = () => {
      expect(useToggle("test_feature")).toBe(true);
      return null;
    };

    render(
      <TogglesProvider toggles={["test_feature"]}>
        <TestComponent />
      </TogglesProvider>
    );
  });

  it("returns false if the toggle is not defined", () => {
    const TestComponent = () => {
      expect(useToggle("test_feature")).toBe(false);
      return null;
    };

    render(
      <TogglesProvider toggles={[]}>
        <TestComponent />
      </TogglesProvider>
    );
  });
});
