import { withResult } from "@diary/shared/ResultOrError";
import { render } from "@testing-library/react";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { failWithError } from "test/failWithError";
import { describe, expect, it } from "vitest";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const diaryDateResult = DiaryDate.from("2010-01-01");
    failWithError(diaryDateResult);
    withResult<DiaryDate>(diaryDateResult, (date) => {
      const formattedDate = render(<FormattedDate />, {
        wrapper: wrap(withLocale("en-AU"), withDate(date)),
      });

      expect(
        formattedDate.queryByText(/Friday, 1 January 2010/)
      ).toBeInTheDocument();
    });
  });
});
