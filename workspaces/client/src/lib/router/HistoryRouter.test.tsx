import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HistoryRouter } from "./HistoryRouter";
import { Link } from "./Link";
import { Route } from "./Route";

describe("HistoryRouter", () => {
  it("updates the route", async () => {
    const user = userEvent.setup();
    render(
      <HistoryRouter>
        <Route path="/">
          <Link to="/foo">go</Link>
        </Route>
        <Route path="/foo">Hello!</Route>
      </HistoryRouter>
    );

    user.click(screen.getByRole("link", { name: "go" }));

    await waitFor(() => {
      expect(screen.queryByText("Hello!")).toBeInTheDocument();
    });
  });

  it("navigates to initialPath if provided", async () => {
    render(
      <HistoryRouter initialPath="/foo">
        <Route path="/">
          <Link to="/foo">go</Link>
        </Route>
        <Route path="/foo">Hello!</Route>
      </HistoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Hello!")).toBeInTheDocument();
    });
  });
});
