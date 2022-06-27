import { render, screen, waitFor } from "@testing-library/react";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { withToggles } from "lib/toggles/TogglesProvider.testWrapper";
import { DiaryDate } from "lib/util/date";
import { MemoryRouter } from "react-router";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it, vi } from "vitest";
import { AppRoutes } from "./AppRoutes";
import { buildPageRoute } from "./buildPageRoute";

describe("AppRoutes - authenticated", () => {
  it("renders the diary entry for the date in the route", () => {
    render(
      <MemoryRouter initialEntries={[buildPageRoute("2020-01-01")]}>
        <AppRoutes />
      </MemoryRouter>,
      {
        wrapper: wrap(
          withToggles(["auth"]),
          withAuth0Wrapper({ isAuthenticated: true }),
          withApollo(buildMockApolloClient()),
          withLocale("en-AU")
        ),
      }
    );

    expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
  });

  it("redirects to the current date if no path is provided", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
      {
        wrapper: wrap(
          withToggles(["auth"]),
          withAuth0Wrapper({ isAuthenticated: true }),
          withApollo(buildMockApolloClient()),
          withLocale("en-AU")
        ),
      }
    );

    expect(
      screen.getByText(new DiaryDate().getFormatted("en-AU"))
    ).toBeInTheDocument();
  });
});

describe("AppRoutes - unauthenticated", () => {
  it("redirects from diary entry route to login", async () => {
    const loginWithRedirect = vi.fn();

    render(
      <MemoryRouter initialEntries={[buildPageRoute("2020-01-01")]}>
        <AppRoutes />
      </MemoryRouter>,
      {
        wrapper: wrap(
          withToggles(["auth"]),
          withAuth0Wrapper({ isAuthenticated: false, loginWithRedirect }),
          withApollo(buildMockApolloClient()),
          withLocale("en-AU")
        ),
      }
    );

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });

  it("redirects from empty path to login", async () => {
    const loginWithRedirect = vi.fn();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
      {
        wrapper: wrap(
          withToggles(["auth"]),
          withAuth0Wrapper({ isAuthenticated: false, loginWithRedirect }),
          withApollo(buildMockApolloClient()),
          withLocale("en-AU")
        ),
      }
    );

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });
});
