import { describe, expect, it } from "vitest";
import { matchNonWildcardPath, matchWildcardPath } from "./matchPath";

describe("matchNonWildcardPath", () => {
  it("doesn't match if the strings are different", () => {
    expect(matchNonWildcardPath("/user/foo", "/user/bar").isMatch).toBe(false);
  });

  it("matches if the strings are identical", () => {
    expect(matchNonWildcardPath("/user/foo", "/user/foo").isMatch).toBe(true);
  });

  it("doesn't match if there is additional content at the end of the path", () => {
    expect(matchNonWildcardPath("/user/foo", "/user/foo/bar").isMatch).toBe(
      false
    );
  });

  it("doesn't match if there is additional content at the start of the path", () => {
    expect(matchNonWildcardPath("/user/foo", "/bar/user/foo").isMatch).toBe(
      false
    );
  });

  it("doesn't match if there is additional content at the end of the template", () => {
    expect(matchNonWildcardPath("/user/foo/bar", "/user/foo").isMatch).toBe(
      false
    );
  });

  it("doesn't match if there is additional content at the start of the template", () => {
    expect(matchNonWildcardPath("/bar/user/foo", "/user/foo").isMatch).toBe(
      false
    );
  });

  it("matches a path with a template placeholder", () => {
    expect(matchNonWildcardPath("/user/:username", "/user/foo").isMatch).toBe(
      true
    );
  });

  it("matches a path with multiple template placeholders", () => {
    expect(
      matchNonWildcardPath("/user/:username/:action", "/user/foo/bury").isMatch
    ).toBe(true);
  });

  it("extracts placeholder values from the supplied path", () => {
    expect(
      matchNonWildcardPath("/user/:username/:action", "/user/foo/bury").params
    ).toEqual({ username: "foo", action: "bury" });
  });
});

describe("matchWildcardPath", () => {
  it("matches a single asterisk", () => {
    expect(matchWildcardPath("*").isMatch).toBe(true);
  });

  it("does not match any other string", () => {
    expect(matchWildcardPath("/*").isMatch).toBe(false);
  });
});
