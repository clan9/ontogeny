import moment from "moment";
import selectExpenses from "./selectExpenses";
import expenses from "../fixtures/expenses";

describe("selectExpenses selector", () => {
  test("should filter expenses by text", () => {
    const filters = {
      text: "e",
      sortBy: "date",
      startDate: undefined,
      endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[1], expenses[2]]);
  });

  test("should sort expenses by date", () => {
    const filters = {
      text: "",
      sortBy: "date",
      startDate: undefined,
      endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result.length).toBe(3);
    expect(result).toEqual([expenses[1], expenses[0], expenses[2]]);
  });

  test("should sort expenses by amount", () => {
    const filters = {
      text: "",
      sortBy: "amount",
      startDate: undefined,
      endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result.length).toBe(3);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
  });

  test("should filter by startDate", () => {
    const filters = {
      text: "",
      sortBy: "date",
      startDate: moment(0).add(2, "days"),
      endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[1], expenses[0]]);
  });

  test("should filter by endDate", () => {
    const filters = {
      text: "",
      sortBy: "date",
      startDate: undefined,
      endDate: moment(0).add(4, "days")
    };

    const result = selectExpenses(expenses, filters);
    expect(result.length).toBe(2);
    expect(result).toEqual([expenses[0], expenses[2]]);
  });
});
