import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useParam } from "../contexts/useParam";
import { Link } from "./Link";
import { Route } from "./Route";
import { Router } from "./Router";

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
      expect(useParam("username")).toEqual("foo");
      expect(useParam("action")).toEqual("bar");
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

  it("provides an empty string if useParam is called with a parameter that's not in the match", () => {
    const TestComponent = () => {
      expect(useParam("foo")).toEqual("");
      return null;
    };

    render(
      <Router initialPath="/user/foo/bar">
        <Route path="/user/foo/bar">
          <TestComponent />
        </Route>
      </Router>
    );
  });

  it("uses the pathSetter provided", async () => {
    const updatePath = vi.fn();
    const user = userEvent.setup();
    render(
      <Router initialPath="/" updatePath={updatePath}>
        <Route path="/">
          <Link to="/foo">go</Link>
        </Route>
      </Router>
    );

    user.click(screen.getByRole("link", { name: "go" }));

    await waitFor(() => {
      expect(updatePath).toHaveBeenCalledWith("/foo");
    });
  });

  it("renders the fallback component if no matching route is found", () => {
    const Fallback: React.FC = () => <>This is the fallback</>;
    render(
      <Router initialPath="/something" fallback={Fallback}>
        <Route path="/another-thing">Hello</Route>
      </Router>
    );

    expect(screen.queryByText("This is the fallback")).toBeInTheDocument();
  });

  it("does not render the fallback component if a matching route is found", () => {
    const Fallback: React.FC = () => <>This is the fallback</>;
    render(
      <Router initialPath="/something" fallback={Fallback}>
        <Route path="/something">
          <>Hello</>
        </Route>
      </Router>
    );

    expect(screen.queryByText("This is the fallback")).not.toBeInTheDocument();
  });

  it("renders the fallback component when navigating to an unmatched route", async () => {
    const Fallback: React.FC = () => <>This is the fallback</>;
    render(
      <Router initialPath="/something" fallback={Fallback}>
        <Route path="/something">
          <Link to="/nothing">Go</Link>
        </Route>
      </Router>
    );

    expect(screen.queryByText("This is the fallback")).not.toBeInTheDocument();
    screen.getByRole("link", { name: "Go" }).click();
    await waitFor(() => {
      expect(screen.queryByText("This is the fallback")).toBeInTheDocument();
    });
  });
});
