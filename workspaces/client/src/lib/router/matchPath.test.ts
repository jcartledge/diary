import { describe, expect, it } from "vitest";
import { matchExactPath, matchPath } from "./matchPath";

describe("matchPath", () => {
  it("doesn't match if the strings are different", () => {
    expect(matchPath("/user/foo", "/user/bar").isMatch).toBe(false);
  });

  it("matches if the strings are identical", () => {
    expect(matchPath("/user/foo", "/user/foo").isMatch).toBe(true);
  });

  it("matches if the template matches the start of the path", () => {
    expect(matchPath("/user/foo", "/user/foo/more").isMatch).toBe(true);
  });

  it("doesn't match if the template doesn't match the start of the path", () => {
    expect(matchPath("/user/foo", "/all/user/foo/more").isMatch).toBe(false);
  });

  it("matches a path with a template placeholder", () => {
    expect(matchPath("/user/:username", "/user/foo").isMatch).toBe(true);
  });

  it("matches a path with multiple template placeholders", () => {
    expect(matchPath("/user/:username/:action", "/user/foo/bury").isMatch).toBe(
      true
    );
  });

  it("extracts placeholder values from the supplied path", () => {
    expect(
      matchPath("/user/:username/:action", "/user/foo/bury").params
    ).toEqual({ username: "foo", action: "bury" });
  });
});

describe("matchExactPath", () => {
  it("matches a path", () => {
    expect(matchExactPath("/user/foo", "/user/foo").isMatch).toBe(true);
  });

  it("doesn't match iif paths are not exact", () => {
    expect(matchExactPath("/user/foo", "/user/foo/bar").isMatch).toBe(false);
  });
});
