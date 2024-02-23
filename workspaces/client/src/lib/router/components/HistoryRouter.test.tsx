import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HistoryRouter } from "./HistoryRouter";
import { Link } from "./Link";
import { Route } from "./Route";

const getGoLink = () => screen.queryByRole("link", { name: "go" });

describe("HistoryRouter", () => {
  it("updates the route", async () => {
    const user = userEvent.setup();
    render(
      <HistoryRouter>
        <Route path="/">
          <Link to="/foo">go</Link>
        </Route>
        <Route path="/foo">Hello!</Route>
      </HistoryRouter>,
    );

    user.click(getGoLink()!);

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
      </HistoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Hello!")).toBeInTheDocument();
    });
  });

  it("updates when the back button is pressed", async () => {
    const user = userEvent.setup();
    render(
      <HistoryRouter initialPath="/foo">
        <Route path="/">
          <Link to="/foo">go</Link>
        </Route>
        <Route path="/foo">Hello!</Route>
      </HistoryRouter>,
    );

    await user.click(getGoLink()!);
    window.history.back();

    await waitFor(() => {
      expect(getGoLink()).toBeInTheDocument();
    });
  });
});
