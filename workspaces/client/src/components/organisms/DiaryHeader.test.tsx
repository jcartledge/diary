import { render, waitFor } from "@testing-library/react";
import { buildPageRoute } from "routes";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "souvlaki-react-router";
import { withDiaryEntryContext, withLocale } from "testWrappers";
import { buildMockClient } from "util/buildMockClient";
import { DiaryDate } from "util/date";
import DiaryHeader from "./DiaryHeader";

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const diaryHeader = render(<DiaryHeader />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
        withLocale("en-AU"),
        withRoute(buildPageRoute(), {
          isoDateString: new DiaryDate().getKey(),
        }),
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
        withApollo(buildMockClient()),
        withLocale("en-AU"),
        withRoute(buildPageRoute(), {
          isoDateString: new DiaryDate().getKey(),
        }),
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
