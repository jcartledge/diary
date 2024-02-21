import { render, screen } from "@testing-library/react";
import { wrapWithDate } from "app/context/date/DateContext.testWrapper";
import { wrapWithDiaryEntryContext } from "app/context/diaryEntry/DiaryEntryContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { describe, expect, it } from "vitest";
import { DiaryNav } from "./DiaryNav";
import { composeWrappers } from "lib/util/composeWrappers";

describe("DiaryNav", () => {
  it("disables prev button if entry is dirty", () => {
    render(<DiaryNav />, {
      wrapper: wrapWithDiaryEntryContext({ isDirty: true }),
    });

    expect(screen.getByText("prev")).toHaveAttribute("aria-disabled");
  });

  it("does not disable prev button if entry is not dirty", () => {
    render(<DiaryNav />, {
      wrapper: (wrapWithDiaryEntryContext({ isDirty: false })),
    });

    expect(screen.getByText("prev")).not.toHaveAttribute("aria-disabled");
  });

  it("disables next button if entry is dirty", () => {
    render(<DiaryNav />, {
      wrapper: composeWrappers(
        wrapWithDiaryEntryContext({ isDirty: true }),
        wrapWithDate(new DiaryDate().getPrevious())
      ),
    });

    expect(screen.getByText("next")).toHaveAttribute("aria-disabled");
  });

  it("does not disable next button if entry is not dirty", () => {
    render(<DiaryNav />, {
      wrapper: composeWrappers(
        wrapWithDiaryEntryContext({ isDirty: false }),
        wrapWithDate(new DiaryDate().getPrevious())
      ),
    });

    expect(screen.getByText("next")).not.toHaveAttribute("aria-disabled");
  });
});
