import { render } from "@testing-library/react";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = DiaryDate.from("2010-01-01");
    if ("error" in date) {
      expect.fail(date.error.message);
    }

    const formattedDate = render(<FormattedDate />, {
      wrapper: wrap(withLocale("en-AU"), withDate(date.result)),
    });

    expect(
      formattedDate.queryByText(/Friday, 1 January 2010/)
    ).toBeInTheDocument();
  });
});
