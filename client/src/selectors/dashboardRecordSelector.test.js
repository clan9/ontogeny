import moment from "moment";
import dashBoardRecordSelector from "./dashboardRecordSelector";
import expenses from "../fixtures/expenses";

describe("dashboardRecordSelector", () => {
  test("should sort records by date (oldest to newest) when no startDate or endDate filter is defined", () => {
    const filters = {};
    const result = dashBoardRecordSelector(expenses, filters);
    expect(result.length).toBe(3);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
  });

  test("should filter records by start date and return matches in order from oldest to newest", () => {
    const filters = { startDate: moment(0).add(1, "day") };
    const result = dashBoardRecordSelector(expenses, filters);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[0], expenses[1]]);
  });

  test("should filter records by end date and return matches in order from oldest to newest", () => {
    const filters = { endDate: moment(0).add(4, "days") };
    const result = dashBoardRecordSelector(expenses, filters);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[2], expenses[0]]);
  });
});
