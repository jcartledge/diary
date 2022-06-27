import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { buildPageRoute } from "app/routes/buildPageRoute";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { withRoute } from "test/wrappers/withRoute";
import { describe, expect, it, vi } from "vitest";
import DatePrevButton from "./DatePrevButton";

const getPrevButton = () => screen.getByRole("button", { name: "prev" });

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const onPathChange = vi.fn();
    const date = new DiaryDate();
    render(<DatePrevButton />, {
      wrapper: wrap(
        withApollo(buildMockApolloClient()),
        withDate(date),
        withRoute("", {}, onPathChange)
      ),
    });

    await userEvent.click(getPrevButton());

    expect(onPathChange).toHaveBeenCalledWith(
      buildPageRoute(date.getPrevious().getKey())
    );
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const mockClient = buildMockApolloClient({ whatHappened: "Lots" });

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });

    await waitFor(() => {
      expect(getPrevButton()).toHaveClass("font-bold");
    });
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockApolloClient();

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });

    expect(getPrevButton()).not.toHaveClass("font-bold");
  });
});
