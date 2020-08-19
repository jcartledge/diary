import { render, screen } from "@testing-library/react";
import React from "react";
import { Diary } from "./Diary";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    render(
      <Diary locale="en-AU" date={new Date(Date.UTC(2010, 0, 1, 12, 0, 0))} />
    );

    expect(screen.getByText(/Friday, 1 January 2010/)).toBeInTheDocument();
  });
});
