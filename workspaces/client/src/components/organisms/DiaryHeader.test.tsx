import { render, waitFor } from "@testing-library/react";
import { withDiaryEntryContext, withLocale } from "components/testWrappers";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import DiaryHeader from "./DiaryHeader";

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const diaryHeader = render(<DiaryHeader />, {
      wrapper: wrap(
        withApollo(),
        withLocale("en-AU"),
        withDiaryEntryContext({ isDirty: true })
      ),
    });

    await waitFor(() =>
      expect(diaryHeader.container.querySelector(".italic")).toBeInTheDocument()
    );
  });

  it(`doesn't show the date italicised if the entry has no unsaved changes`, async () => {
    const diaryHeader = render(<DiaryHeader />, {
      wrapper: wrap(
        withApollo(),
        withLocale("en-AU"),
        withDiaryEntryContext({ isDirty: false })
      ),
    });

    await waitFor(() =>
      expect(
        diaryHeader.container.querySelector(".italic")
      ).not.toBeInTheDocument()
    );
  });
});
