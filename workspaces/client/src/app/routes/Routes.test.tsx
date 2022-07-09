import { render, screen } from "@testing-library/react";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { withRouter } from "lib/router";
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
import { buildDiaryPageRoute } from "./buildDiaryPageRoute";
import { Routes } from "./Routes";

describe("Routes", () => {
  describe("auth toggle off", () => {
    const withAuthToggleOff = withToggles();

    it("renders the diary entry for the date in the route", () => {
      render(<Routes />, {
        wrapper: wrap(
          withAuthToggleOff,
          withRouter(buildDiaryPageRoute("2020-01-01")),
          withApollo(buildMockApolloClient()),
          withLocale("en-AU")
        ),
      });

      expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
    });

    it("redirects to the current date if no path is provided", () => {
      render(<Routes />, {
        wrapper: wrap(
          withAuthToggleOff,
          withRouter("/"),
          withApollo(buildMockApolloClient()),
          withLocale("en-AU")
        ),
      });

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
        render(<Routes />, {
          wrapper: wrap(
            withAuthToggleOn,
            withAuthenticatedUser,
            withRouter(buildDiaryPageRoute("2020-01-01")),
            withApollo(buildMockApolloClient()),
            withLocale("en-AU")
          ),
        });

        expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
      });

      it("redirects to the current date if no path is provided", () => {
        render(<Routes />, {
          wrapper: wrap(
            withAuthToggleOn,
            withAuthenticatedUser,
            withRouter("/"),
            withApollo(buildMockApolloClient()),
            withLocale("en-AU")
          ),
        });

        expect(
          screen.getByText(new DiaryDate().getFormatted("en-AU"))
        ).toBeInTheDocument();
      });
    });

    describe("Unauthenticated", () => {
      const withUnauthenticatedUser = withAuth0Wrapper({
        isAuthenticated: false,
      });

      it("displays the landing page", () => {
        render(<Routes />, {
          wrapper: wrap(
            withAuthToggleOn,
            withUnauthenticatedUser,
            withRouter("/")
          ),
        });

        expect(
          screen.getByRole("button", { name: /Log in/ })
        ).toBeInTheDocument();
      });
    });
  });
});
