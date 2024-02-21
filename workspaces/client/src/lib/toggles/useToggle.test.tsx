import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { wrapWithToggle, wrapWithToggles } from "./TogglesProvider.testWrapper";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("returns the requested toggle from the provider", () => {
    const { result } = renderHook(() => useToggle("test_feature"), {
      wrapper: wrapWithToggle("test_feature"),
    });

    expect(result.current).toBe(true);
  });

  it("returns false if the toggle is not defined", () => {
    const { result } = renderHook(() => useToggle("test_feature"), {
      wrapper: wrapWithToggles(),
    });

    expect(result.current).toBe(false);
  });
});
