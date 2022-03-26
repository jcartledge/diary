import { render, waitFor } from "@testing-library/react";
import { wrap } from "souvlaki";
import { withDiaryEntryContext } from "../../testWrappers/withDiaryEntryContext";
import { withLocale } from "../../testWrappers/withLocale";
import { withMockedApolloProvider } from "../../testWrappers/withMockedApolloProvider";
import { withRoute } from "../../testWrappers/withRoute";
import DiaryHeader from "./DiaryHeader";

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const diaryHeader = render(<DiaryHeader />, {
      wrapper: wrap(
        withMockedApolloProvider(),
        withLocale("en-AU"),
        withRoute(),
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
        withMockedApolloProvider(),
        withLocale("en-AU"),
        withRoute(),
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
