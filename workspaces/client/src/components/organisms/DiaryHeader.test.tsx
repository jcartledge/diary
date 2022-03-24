import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { wrap } from "souvlaki";
import { withDiaryEntryContext } from "../../testWrappers/withDiaryEntryContext";
import { withLocale } from "../../testWrappers/withLocale";
import { withRoute } from "../../testWrappers/withRoute";
import DiaryHeader from "./DiaryHeader";

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const diaryHeader = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiaryHeader />
      </MockedProvider>,
      {
        wrapper: wrap(
          withLocale("en-AU"),
          withRoute(),
          withDiaryEntryContext({ isDirty: true })
        ),
      }
    );

    await waitFor(() =>
      expect(diaryHeader.container.querySelector(".italic")).toBeInTheDocument()
    );
  });

  it(`doesn't show the date italicised if the entry has no unsaved changes`, async () => {
    const diaryHeader = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DiaryHeader />
      </MockedProvider>,
      {
        wrapper: wrap(
          withLocale("en-AU"),
          withRoute(),
          withDiaryEntryContext({ isDirty: false })
        ),
      }
    );

    await waitFor(() =>
      expect(
        diaryHeader.container.querySelector(".italic")
      ).not.toBeInTheDocument()
    );
  });
});
