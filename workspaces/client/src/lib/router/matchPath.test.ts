import { describe, expect, it } from "vitest";
import { matchPath } from "./matchPath";

describe("matchPath", () => {
  it("doesn't match if the strings are different", () => {
    expect(matchPath("/user/foo", "/user/bar").isMatch).toBe(false);
  });

  it("matches if the strings are identical", () => {
    expect(matchPath("/user/foo", "/user/foo").isMatch).toBe(true);
  });

  it("matches a path with a template placeholder", () => {
    expect(matchPath("/user/:username", "/user/foo").isMatch).toBe(true);
  });

  it("matches a path with multiple template placeholders", () => {
    expect(matchPath("/user/:username/:action", "/user/foo/bury").isMatch).toBe(
      true
    );
  });
});
