import moment from "moment";

// map through expenses and incomes for their dates
// return an array of the dates with duplicates removed
const sortDates = (expenses, income) => {
  const expensesDates = expenses.map(expense => moment(expense.date).valueOf());
  const incomeDates = income.map(income => moment(income.date).valueOf());
  const sortedCombinedDates = [...expensesDates, ...incomeDates].sort();
  const formattedDatesArray = sortedCombinedDates.map(date =>
    moment(date).format("DD MMM")
  );
  const datesSet = new Set(formattedDatesArray);
  const finalDatesArray = [...datesSet];
  return finalDatesArray;
};

// Call the sortDates method, map through the dates
// for each date, get matching expenses/incomes
// map through the matches and return the amounts
// reduce the amounts to get total expenses/incomes per date
const summedTotalsForDates = (expenses, income) => {
  const summedExpenses = [];
  const summedIncome = [];
  const dates = sortDates(expenses, income);
  dates.map(date => {
    const expenseTotal = expenses
      .filter(expense => moment(expense.date).format("DD MMM") === date)
      .map(expense => expense.amount / 100)
      .reduce((total, amount) => total + amount, 0);
    const incomeTotal = income
      .filter(income => moment(income.date).format("DD MMM") === date)
      .map(income => income.amount / 100)
      .reduce((total, amount) => total + amount, 0);

    summedExpenses.push({ date, expenseTotal });
    summedIncome.push({ date, incomeTotal });
    return null;
  });
  return { summedExpenses, summedIncome };
};

export { sortDates, summedTotalsForDates };
