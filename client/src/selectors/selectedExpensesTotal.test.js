import expensesTotal from "./selectedExpensesTotal";
import expenses from "../fixtures/expenses";

describe("selectedExpensesTotal selector", () => {
  test("should return 0 for no matching expenses", () => {
    const total = expensesTotal([]);
    expect(total).toBe(0);
  });

  test("should return correct total for one matching expense", () => {
    const total = expensesTotal([expenses[1]]);
    expect(total).toBe(expenses[1].amount);
  });

  test("should return correct total for multiple matching expenses", () => {
    const total = expensesTotal([expenses[0], expenses[2]]);
    expect(total).toBe(expenses[0].amount + expenses[2].amount);
  });
});
