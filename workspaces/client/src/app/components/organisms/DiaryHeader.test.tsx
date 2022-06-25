import { render } from "@testing-library/react";
import { withDiaryEntryContext } from "app/context/diaryEntry/DiaryEntryContext.testWrapper";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { buildMockClient } from "lib/util/buildMockClient";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "test/wrappers/withRoute";
import { describe, expect, it } from "vitest";
import DiaryHeader from "./DiaryHeader";

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const diaryHeader = render(<DiaryHeader />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
        withLocale("en-AU"),
        withRoute(),
        withDiaryEntryContext({ isDirty: true })
      ),
    });

    expect(diaryHeader.container.querySelector(".italic")).not.toBe(null);
  });

  it(`doesn't show the date italicised if the entry has no unsaved changes`, async () => {
    const diaryHeader = render(<DiaryHeader />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
        withLocale("en-AU"),
        withRoute(),
        withDiaryEntryContext({ isDirty: false })
      ),
    });

    expect(diaryHeader.container.querySelector(".italic")).toBe(null);
  });
});
