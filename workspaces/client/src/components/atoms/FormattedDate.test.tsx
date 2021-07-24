import { render } from "@testing-library/react";
import { withLocale } from "components/testWrappers";
import { wrap } from "souvlaki";
import { withRoute } from "souvlaki-react-router";
import { DiaryDate } from "util/date";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

    const formattedDate = render(<FormattedDate />, {
      wrapper: wrap(
        withLocale("en-AU"),
        withRoute("/page/:isoDateString", { isoDateString: date.getKey() })
      ),
    });

    expect(
      formattedDate.getByText(/Friday, 1 January 2010/)
    ).toBeInTheDocument();
  });
});
