import { render, screen } from "@testing-library/react";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { HistoryRouter } from "lib/router";
import {
  withToggle,
  withToggles,
} from "lib/toggles/TogglesProvider.testWrapper";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./AppRoutes";
import { buildPageRoute } from "./buildPageRoute";

describe("AppRoutes", () => {
  describe("auth toggle off", () => {
    const withAuthToggleOff = withToggles();

    it("renders the diary entry for the date in the route", () => {
      render(
        <HistoryRouter initialPath={buildPageRoute("2020-01-01")}>
          <AppRoutes />
        </HistoryRouter>,
        {
          wrapper: wrap(
            withAuthToggleOff,
            withApollo(buildMockApolloClient()),
            withLocale("en-AU")
          ),
        }
      );

      expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
    });

    it("redirects to the current date if no path is provided", () => {
      render(
        <HistoryRouter>
          <AppRoutes />
        </HistoryRouter>,
        {
          wrapper: wrap(
            withAuthToggleOff,
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

  describe("auth toggle on", () => {
    const withAuthToggleOn = withToggle("auth");
    describe("authenticated", () => {
      const withAuthenticatedUser = withAuth0Wrapper({ isAuthenticated: true });
      it("renders the diary entry for the date in the route", () => {
        render(
          <HistoryRouter initialPath={buildPageRoute("2020-01-01")}>
            <AppRoutes />
          </HistoryRouter>,
          {
            wrapper: wrap(
              withAuthToggleOn,
              withAuthenticatedUser,
              withApollo(buildMockApolloClient()),
              withLocale("en-AU")
            ),
          }
        );

        expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
      });

      it("redirects to the current date if no path is provided", () => {
        render(
          <HistoryRouter>
            <AppRoutes />
          </HistoryRouter>,
          {
            wrapper: wrap(
              withAuthToggleOn,
              withAuthenticatedUser,
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
  });
});
