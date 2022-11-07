import { render, screen } from "@testing-library/react";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withDiaryEntryContext } from "app/context/diaryEntry/DiaryEntryContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { DiaryNav } from "./DiaryNav";

describe("DiaryNav", () => {
  it("disables prev button if entry is dirty", () => {
    render(<DiaryNav />, {
      wrapper: wrap(withDiaryEntryContext({ isDirty: true })),
    });

    expect(screen.getByText("prev")).toHaveAttribute("aria-disabled");
  });

  it("does not disable prev button if entry is not dirty", () => {
    render(<DiaryNav />, {
      wrapper: wrap(withDiaryEntryContext({ isDirty: false })),
    });

    expect(screen.getByText("prev")).not.toHaveAttribute("aria-disabled");
  });

  it("disables next button if entry is dirty", () => {
    render(<DiaryNav />, {
      wrapper: wrap(
        withDiaryEntryContext({ isDirty: true }),
        withDate(new DiaryDate().getPrevious())
      ),
    });

    expect(screen.getByText("next")).toHaveAttribute("aria-disabled");
  });

  it("does not disable next button if entry is not dirty", () => {
    render(<DiaryNav />, {
      wrapper: wrap(
        withDiaryEntryContext({ isDirty: false }),
        withDate(new DiaryDate().getPrevious())
      ),
    });

    expect(screen.getByText("next")).not.toHaveAttribute("aria-disabled");
  });
});
