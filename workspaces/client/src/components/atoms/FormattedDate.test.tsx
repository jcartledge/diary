import { cleanup, render } from "@testing-library/react";
import { wrap } from "souvlaki";
import { afterEach, describe, expect, it } from "vitest";
import { withDate } from "../../testWrappers/withDate";
import { withLocale } from "../../testWrappers/withLocale";
import { DiaryDate } from "../../util/date";
import { FormattedDate } from "./FormattedDate";

afterEach(() => {
  cleanup();
});

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

    const formattedDate = render(<FormattedDate />, {
      wrapper: wrap(withLocale("en-AU"), withDate(date)),
    });

    expect(formattedDate.queryByText(/Friday, 1 January 2010/)).not.toBe(null);
  });
});
