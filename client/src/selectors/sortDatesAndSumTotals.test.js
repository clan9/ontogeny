import { sortDates, summedTotalsForDates } from "./sortDatesAndSumTotals";
import expenses from "../fixtures/expenses";
import income from "../fixtures/income";

describe("sortDatesAndSumTotals selector", () => {
  test("sortDates -> should take in expenses and income arrays and return an array of the dates (sorted by oldest -> newest) with duplicates removed", () => {
    const result = sortDates(expenses, income);
    const expectedResult = ["29 Dec", "04 Jan", "06 Jan"];
    expect(result.length).toBe(3);
    expect(result).toEqual(expectedResult);
  });

  test("summedTotalsForDates -> should take in expenses and income arrays and return an object that contains an summedExpenses prop (array) and an summedIncome prop (array). These are arrays of objects that show the sum total of expenses and incomes for each date", () => {
    const result = summedTotalsForDates(expenses, income);
    const expectedResult = {
      summedExpenses: [
        { date: "29 Dec", expenseTotal: 25 },
        { date: "04 Jan", expenseTotal: 1.95 },
        { date: "06 Jan", expenseTotal: 595.99 }
      ],
      summedIncome: [
        { date: "29 Dec", incomeTotal: 995 },
        { date: "04 Jan", incomeTotal: 20 },
        { date: "06 Jan", incomeTotal: 595.99 }
      ]
    };
    expect(result).toEqual(expectedResult);
    expect(result.summedExpenses.length).toBe(3);
    expect(result.summedIncome.length).toBe(3);
  });
});
