import { renderHook } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { withToggle, withToggles } from "./TogglesProvider.testWrapper";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("returns the requested toggle from the provider", () => {
    const { result } = renderHook(() => useToggle("test_feature"), {
      wrapper: wrap(withToggle("test_feature")),
    });

    expect(result.current).toBe(true);
  });

  it("returns false if the toggle is not defined", () => {
    const { result } = renderHook(() => useToggle("test_feature"), {
      wrapper: wrap(withToggles()),
    });

    expect(result.current).toBe(false);
  });
});
