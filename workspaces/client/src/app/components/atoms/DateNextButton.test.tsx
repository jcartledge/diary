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
import DateNextButton from "./DateNextButton";

const getNextButton = () => screen.getByRole("button", { name: "next" });

describe("DateNextButton", () => {
  it("links to the next date", async () => {
    const onPathChange = vi.fn();
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    render(<DateNextButton />, {
      wrapper: wrap(
        withApollo(buildMockApolloClient()),
        withDate(yesterday),
        withRoute("", {}, onPathChange)
      ),
    });

    await userEvent.click(getNextButton());

    expect(onPathChange).toHaveBeenCalledWith(buildPageRoute(today.getKey()));
  });

  it("does not increment past the current date", async () => {
    const onPathChange = vi.fn();
    const today = new DiaryDate();

    render(<DateNextButton />, {
      wrapper: wrap(
        withApollo(buildMockApolloClient()),
        withDate(today),
        withRoute("", {}, onPathChange)
      ),
    });

    expect(getNextButton().getAttribute("disabled")).not.toBe(null);

    await userEvent.click(getNextButton());

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockApolloClient({ whatHappened: "Lots" });

    render(<DateNextButton />, {
      wrapper: wrap(withApollo(mockClient), withDate(date), withRoute()),
    });

    await waitFor(() =>
      expect(getNextButton().classList.contains("font-bold")).toBe(true)
    );
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockApolloClient();

    render(<DateNextButton />, {
      wrapper: wrap(withApollo(mockClient), withDate(date), withRoute()),
    });

    expect(getNextButton().classList.contains("font-bold")).toBe(false);
  });
});
