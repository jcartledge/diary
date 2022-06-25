import { render } from "@testing-library/react";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

    const formattedDate = render(<FormattedDate />, {
      wrapper: wrap(withLocale("en-AU"), withDate(date)),
    });

    expect(formattedDate.queryByText(/Friday, 1 January 2010/)).not.toBe(null);
  });
});
