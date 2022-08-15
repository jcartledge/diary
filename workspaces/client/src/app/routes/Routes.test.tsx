import { render, screen } from "@testing-library/react";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { withRouter } from "lib/router";
import { withToggles } from "lib/toggles/TogglesProvider.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import { buildDiaryPageRoute } from "./buildDiaryPageRoute";
import { Routes } from "./Routes";

describe("Routes", () => {
  describe("authenticated", () => {
    const withAuthenticatedUser = withAuth0Wrapper({ isAuthenticated: true });

    it("renders the diary entry for the date in the route", () => {
      render(<Routes />, {
        wrapper: wrap(
          withQueryClient(),
          withToggles(),
          withAuthenticatedUser,
          withRouter(buildDiaryPageRoute("2020-01-01")),
          withLocale("en-AU")
        ),
      });

      expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
    });

    it("redirects to the current date if no path is provided", () => {
      render(<Routes />, {
        wrapper: wrap(
          withQueryClient(),
          withToggles(),
          withAuthenticatedUser,
          withRouter("/"),
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
        wrapper: wrap(withToggles(), withUnauthenticatedUser, withRouter("/")),
      });

      expect(
        screen.getByRole("button", { name: /Log in/ })
      ).toBeInTheDocument();
    });
  });
});
