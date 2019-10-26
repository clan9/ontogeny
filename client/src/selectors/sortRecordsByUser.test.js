import {
  getDataForUsers,
  getTotalsByUser,
  getUserNamesSet
} from "./sortRecordsByUser";
import expenses from "../fixtures/expenses";
import income from "../fixtures/income";
import getTotal from "./selectedExpensesTotal";

describe("sortRecordsByUser selectors", () => {
  test("getUserNamesSet -> should return a Set of user names with duplicates removed", () => {
    const result = getUserNamesSet([expenses, income]);
    expect(result.size).toEqual(3);
    expect(result.has("simon")).toBe(true);
    expect(result.has("jess")).toBe(true);
    expect(result.has("lee")).toBe(true);
  });

  test("getDataForUsers -> should return an array of user objects that contain the users name, an array of their expenses, and an array of their incomes ", () => {
    const userSet = getUserNamesSet([expenses, income]);
    const result = getDataForUsers(userSet, expenses, income);
    const expectedResult = [
      {
        name: "simon",
        expenses: [expenses[0]],
        income: [income[0]]
      },
      { name: "jess", expenses: [expenses[1]], income: [income[1]] },
      { name: "lee", expenses: [expenses[2]], income: [income[2]] }
    ];
    expect(result).toEqual(expectedResult);
    expect(result.length).toBe(3);
    expect(result[0].expenses.length).toBe(1);
    expect(result[0].income.length).toBe(1);
    expect(result[1].expenses.length).toBe(1);
    expect(result[1].income.length).toBe(1);
    expect(result[2].expenses.length).toBe(1);
    expect(result[2].income.length).toBe(1);
  });

  test("getTotalsByUser -> should take in returned array from getDataForUsers and getTotal function and return array of user names and totals for expenses and incomes", () => {
    const userSet = getUserNamesSet([expenses, income]);
    const usersArray = getDataForUsers(userSet, expenses, income);
    const result = getTotalsByUser(usersArray, getTotal);
    const expectedResult = [
      { name: "simon", expensesTotal: 195, incomeTotal: 2000 },
      { name: "jess", expensesTotal: 59599, incomeTotal: 59599 },
      { name: "lee", expensesTotal: 2500, incomeTotal: 99500 }
    ];

    expect(result.length).toBe(3);
    expect(result).toEqual(expectedResult);
  });
});
