import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EnvironmentTogglesProvider } from "./EnvironmentTogglesProvider";
import { useToggle } from "./useToggle";

describe("EnvironmentTogglesProvider", () => {
  it("gets toggles from the environment", () => {
    const env = { REACT_APP_TOGGLE_FEATURE_1: "true" };
    const TestComponent = () => {
      const toggle = useToggle("FEATURE_1");
      expect(toggle).toBe(true);
      return null;
    };

    render(
      <EnvironmentTogglesProvider environment={env}>
        <TestComponent />
      </EnvironmentTogglesProvider>
    );
  });

  it("parses the string 'false' to boolean false", () => {
    const env = { REACT_APP_TOGGLE_FEATURE_1: "false" };
    const TestComponent = () => {
      const toggle = useToggle("FEATURE_1");
      expect(toggle).toBe(false);
      return null;
    };

    render(
      <EnvironmentTogglesProvider environment={env}>
        <TestComponent />
      </EnvironmentTogglesProvider>
    );
  });
});
