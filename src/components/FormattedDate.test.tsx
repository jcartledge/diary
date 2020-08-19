import { render, screen } from "@testing-library/react";
import React from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    render(
      <LocaleContext.Provider value="en-AU">
        <FormattedDate date={new Date(Date.UTC(2010, 0, 1, 12, 0, 0))} />
      </LocaleContext.Provider>
    );

    expect(screen.getByText(/Friday, 1 January 2010/)).toBeInTheDocument();
  });
});
