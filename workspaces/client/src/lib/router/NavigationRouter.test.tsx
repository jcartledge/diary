import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavigationRouter } from "./NavigationRouter";
import { Route } from "./Route";

describe("NavigationRouter", () => {
  it("renders the root route", () => {
    render(
      <NavigationRouter>
        <Route path="/">Hello</Route>
      </NavigationRouter>
    );

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });
});
