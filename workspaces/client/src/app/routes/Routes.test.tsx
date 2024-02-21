import { render, screen } from "@testing-library/react";
import { wrapWithLocale } from "app/context/locale/LocaleContext.testWrapper";
import { wrapWithRouter } from "lib/router";
import { wrapWithToggles } from "lib/toggles/TogglesProvider.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { wrapWithQueryClient } from "test/wrappers/wrapWithQueryClient";
import { describe, expect, it } from "vitest";
import { buildDiaryPageRoute } from "./buildDiaryPageRoute";
import { Routes } from "./Routes";
import { composeWrappers } from "lib/util/composeWrappers";

describe("Routes", () => {
  describe("authenticated", () => {
    const withAuthenticatedUser = wrapWithAuth0({ isAuthenticated: true });

    it("renders the diary entry for the date in the route", () => {
      render(<Routes />, {
        wrapper: composeWrappers(
          wrapWithQueryClient(),
          wrapWithToggles(),
          withAuthenticatedUser,
          wrapWithRouter(buildDiaryPageRoute("2020-01-01")),
          wrapWithLocale("en-AU")
        )
      });

      expect(screen.getByText(/1 January 2020/)).toBeInTheDocument();
    });

    it("redirects to the current date if no path is provided", () => {
      render(<Routes />, {
        wrapper: composeWrappers(
          wrapWithQueryClient(),
          wrapWithToggles(),
          withAuthenticatedUser,
          wrapWithRouter("/"),
          wrapWithLocale("en-AU")
        ),
      });

      expect(
        screen.getByText(new DiaryDate().getFormatted("en-AU"))
      ).toBeInTheDocument();
    });
  });

  describe("Unauthenticated", () => {
    const withUnauthenticatedUser = wrapWithAuth0({
      isAuthenticated: false,
    });

    it("displays the landing page", () => {
      render(<Routes />, {
        wrapper: composeWrappers(wrapWithToggles(), withUnauthenticatedUser, wrapWithRouter("/")),
      });

      expect(
        screen.getByRole("button", { name: /Log in/ })
      ).toBeInTheDocument();
    });
  });
});
