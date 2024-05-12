import { withResult } from "@diary/shared/ResultOrError";
import { render, screen, waitFor } from "@testing-library/react";
import { wrapWithDate } from "app/context/date/DateContext.testWrapper";
import { wrapWithLocale } from "app/context/locale/LocaleContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { failWithError } from "test/failWithError";
import { describe, expect, it } from "vitest";
import { FormattedDate } from "./FormattedDate";
import { composeWrappers } from "lib/util/composeWrappers";

describe("FormattedDate", () => {
  it("renders the date in the locale passed to it", async () => {
    const diaryDateResult = DiaryDate.from("2010-01-01");
    failWithError(diaryDateResult);
    withResult(diaryDateResult, async (date) => {
      render(<FormattedDate />, {
        wrapper: composeWrappers(wrapWithLocale("en-AU"), wrapWithDate(date)),
      });

      await waitFor(() => {
        expect(screen.getByText(/Friday, 1 January 2010/)).toBeInTheDocument();
      });
    });
  });
});
