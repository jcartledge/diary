import { describe, expect, it } from "vitest";
import { DiaryDate } from "./DiaryDate";

describe("DiaryDate", () => {
  describe("getKey", () => {
    it("returns a date key", () => {
      const date = DiaryDate.from("2010-01-01");
      if ("error" in date) {
        expect.fail(date.error.message);
      }

      expect(date.result.getKey()).toEqual("2010-01-01");
    });
  });

  describe("getPrevious", () => {
    it("returns an object representing the previous date", () => {
      const date = DiaryDate.from("2010-01-01");
      if ("error" in date) {
        expect.fail(date.error.message);
      }

      expect(date.result.getPrevious().getKey()).toEqual("2009-12-31");
    });
  });

  describe("getNext", () => {
    it("returns an object representing the next date", () => {
      const date = DiaryDate.from("2010-01-01");
      if ("error" in date) {
        expect.fail(date.error.message);
      }

      expect(date.result.getNext().getKey()).toEqual("2010-01-02");
    });
  });

  describe("isToday", () => {
    it("returns true if the date is today", () => {
      const date = new DiaryDate();

      expect(date.isToday()).toBe(true);
    });

    it("returns false if the date is not today", () => {
      const date = new DiaryDate();

      expect(date.getPrevious().isToday()).toBe(false);
    });
  });

  describe("from", () => {
    it("returns a DiaryDate if the string is valid", () => {
      const isoDateString = "2015-01-01";
      const diaryDate = DiaryDate.from(isoDateString);
      if ("error" in diaryDate) {
        expect.fail(diaryDate.error.message);
      }

      expect(diaryDate.result!.getKey()).toEqual(isoDateString);
    });

    it("returns an error if the string is not valid", () => {
      expect("error" in DiaryDate.from("")).toBe(true);
    });
  });
});
