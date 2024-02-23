import { withResult } from "@diary/shared/ResultOrError";
import { render } from "@testing-library/react";
import { wrapWithDate } from "app/context/date/DateContext.testWrapper";
import { wrapWithLocale } from "app/context/locale/LocaleContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { failWithError } from "test/failWithError";
import { describe, expect, it } from "vitest";
import { FormattedDate } from "./FormattedDate";
import { composeWrappers } from "lib/util/composeWrappers";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const diaryDateResult = DiaryDate.from("2010-01-01");
    failWithError(diaryDateResult);
    withResult(diaryDateResult, (date) => {
      const formattedDate = render(<FormattedDate />, {
        wrapper: composeWrappers(wrapWithLocale("en-AU"), wrapWithDate(date)),
      });

      expect(
        formattedDate.queryByText(/Friday, 1 January 2010/),
      ).toBeInTheDocument();
    });
  });
});
