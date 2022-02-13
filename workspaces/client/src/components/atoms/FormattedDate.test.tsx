import { render } from "@testing-library/react";
import { wrap } from "souvlaki";
import { withDate } from "../../testWrappers/withDate";
import { withLocale } from "../../testWrappers/withLocale";
import { DiaryDate } from "../../util/date";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

    const formattedDate = render(<FormattedDate />, {
      wrapper: wrap(withLocale("en-AU"), withDate(date)),
    });

    expect(
      formattedDate.getByText(/Friday, 1 January 2010/)
    ).toBeInTheDocument();
  });
});
