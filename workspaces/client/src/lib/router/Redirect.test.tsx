import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HistoryRouter } from "./HistoryRouter";
import { Redirect } from "./Redirect";
import { Route } from "./Route";

describe("Redirect", () => {
  it("Redirects when the path matches", async () => {
    render(
      <HistoryRouter>
        <Redirect path="/" to="/foo"></Redirect>
        <Route path="/foo">Hello!</Route>
      </HistoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Hello!")).toBeInTheDocument();
    });
  });

  it("doesn't redirect when the path doesn't match", async () => {
    render(
      <HistoryRouter>
        <Redirect path="/not-matched" to="/foo"></Redirect>
        <Route path="/">start</Route>
        <Route path="/foo">Hello!</Route>
      </HistoryRouter>
    );

    expect(screen.queryByText("start")).toBeInTheDocument();
  });
});
