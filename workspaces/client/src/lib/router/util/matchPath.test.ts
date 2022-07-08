import { describe, expect, it } from "vitest";
import { matchPath } from "./matchPath";

describe("matchPath", () => {
  it("doesn't match if the strings are different", () => {
    expect(matchPath("/user/foo", "/user/bar").isMatch).toBe(false);
  });

  it("matches if the strings are identical", () => {
    expect(matchPath("/user/foo", "/user/foo").isMatch).toBe(true);
  });

  it("doesn't match if there is additional content at the end of the path", () => {
    expect(matchPath("/user/foo", "/user/foo/bar").isMatch).toBe(false);
  });

  it("doesn't match if there is additional content at the start of the path", () => {
    expect(matchPath("/user/foo", "/bar/user/foo").isMatch).toBe(false);
  });

  it("doesn't match if there is additional content at the end of the template", () => {
    expect(matchPath("/user/foo/bar", "/user/foo").isMatch).toBe(false);
  });

  it("doesn't match if there is additional content at the start of the template", () => {
    expect(matchPath("/bar/user/foo", "/user/foo").isMatch).toBe(false);
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
