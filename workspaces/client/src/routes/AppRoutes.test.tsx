import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { describe, expect, it } from "vitest";
import { withLocale } from "../test/wrappers/withLocale";
import { buildMockClient } from "../util/buildMockClient";
import { DiaryDate } from "../util/date";
import { AppRoutes } from "./AppRoutes";
import { buildPageRoute } from "./buildPageRoute";

describe("AppRoutes", () => {
  it("renders the diary entry for the date in the route", () => {
    render(
      <MemoryRouter initialEntries={[buildPageRoute("2020-01-01")]}>
        <AppRoutes />
      </MemoryRouter>,
      { wrapper: wrap(withApollo(buildMockClient()), withLocale("en-AU")) }
    );

    expect(screen.getByText(/1 January 2020/)).not.toBe(null);
  });

  it("redirects to the current date if no path is provided", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
      { wrapper: wrap(withApollo(buildMockClient()), withLocale("en-AU")) }
    );

    expect(screen.getByText(new DiaryDate().getFormatted("en-AU"))).not.toBe(
      null
    );
  });
});
