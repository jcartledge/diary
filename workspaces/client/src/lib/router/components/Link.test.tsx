import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";
import { Route } from "./Route";
import { Router } from "./Router";

describe("Link", () => {
  it("sets the path in the router", async () => {
    const user = userEvent.setup();
    render(
      <Router initialPath="/">
        <Route path="/">
          <Link to="/hello">go</Link>
        </Route>
        <Route path="/hello">Hello</Route>
      </Router>
    );

    user.click(screen.getByRole("link", { name: "go" }));

    await waitFor(() => {
      expect(screen.queryByText("Hello")).toBeInTheDocument();
    });
  });

  it("can be disabled", () => {
    const linkText = "link text";
    render(
      <Link to="" disabled>
        {linkText}
      </Link>
    );

    expect(
      screen.queryByRole("link", { name: linkText })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(linkText)).toBeInTheDocument();
  });
});
