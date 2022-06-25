import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { describe, expect, it, vi } from "vitest";
import { buildPageRoute } from "../../routes/buildPageRoute";
import { withDate, withRoute } from "../../test/wrappers";
import { buildMockClient } from "../../util/buildMockClient";
import { DiaryDate } from "../../util/date";
import DatePrevButton from "./DatePrevButton";

const getPrevButton = () => screen.getByRole("button", { name: "prev" });

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const onPathChange = vi.fn();
    const date = new DiaryDate();
    render(<DatePrevButton />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
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
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });

    await waitFor(() =>
      expect(getPrevButton().classList.contains("font-bold")).toBe(true)
    );
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockClient();

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });

    expect(getPrevButton().classList.contains("font-bold")).toBe(false);
  });
});
