import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Route, Router, useParams } from "./Router";

describe("Router", () => {
  it("renders the children of a matched route", () => {
    render(
      <Router initialPath="/router/test">
        <Route path="/router/test">Hello</Route>
      </Router>
    );

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render the children of a non-matched route", () => {
    render(
      <Router initialPath="/router/test">
        <Route path="/router/notest">Hello</Route>
      </Router>
    );

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("provides the matched params", () => {
    const TestComponent = () => {
      expect(useParams()).toEqual({ username: "foo", action: "bar" });
      return null;
    };

    render(
      <Router initialPath="/user/foo/bar">
        <Route path="/user/:username/:action">
          <TestComponent />
        </Route>
      </Router>
    );
  });
});
