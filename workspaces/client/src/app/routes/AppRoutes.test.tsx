import { render, screen } from "@testing-library/react";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { HistoryRouter } from "lib/router";
import { withToggles } from "lib/toggles/TogglesProvider.testWrapper";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./AppRoutes";
import { buildPageRoute } from "./buildPageRoute";

describe("AppRoutes", () => {
  describe("auth toggle off", () => {
    it("renders the diary entry for the date in the route", () => {
      render(
        <HistoryRouter initialPath={buildPageRoute("2020-01-01")}>
          <AppRoutes />
        </HistoryRouter>,
        {
          wrapper: wrap(
            withToggles(),
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
            withToggles(),
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
