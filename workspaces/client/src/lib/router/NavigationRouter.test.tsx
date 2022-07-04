import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "@virtualstate/navigation";
import { describe, expect, it } from "vitest";
import { NavigationRouter } from "./NavigationRouter";
import { Route } from "./Route";

describe("NavigationRouter", () => {
  it("renders the root route", () => {
    render(
      <NavigationRouter navigation={new Navigation()}>
        <Route path="/">Hello</Route>
      </NavigationRouter>
    );

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it.skip("handles basic navigation", () => {
    const user = userEvent.setup();
    render(
      <NavigationRouter navigation={new Navigation()}>
        <Route path="/">
          <a href="/a">go</a>
        </Route>
        <Route path="/hello">Hello</Route>
      </NavigationRouter>
    );

    user.click(screen.getByRole("link", { name: "go" }));

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });
});
