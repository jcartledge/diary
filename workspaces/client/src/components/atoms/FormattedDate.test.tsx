import { render } from "@testing-library/react";
import DateContextProvider from "context/DateContext";
import { LocaleContext } from "context/LocaleContext";
import { DiaryDate } from "util/date";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

    const formattedDate = render(
      <LocaleContext.Provider value="en-AU">
        <DateContextProvider date={date}>
          <FormattedDate />
        </DateContextProvider>
      </LocaleContext.Provider>
    );

    expect(
      formattedDate.getByText(/Friday, 1 January 2010/)
    ).toBeInTheDocument();
  });
});
