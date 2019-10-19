// Use this code for selecting incomes too

import moment from "moment";

// Get visible expenses based on the selected filters on page
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const dateMoment = moment(expense.date);

      // if there is a startDate filter, is it <= date on expense
      // if it is, return true, if not, return false
      // it there is no startDate filter, return true
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(dateMoment, "day")
        : true;

      // if there is an endDate filter, is it >= date on expense
      // if it is, return true.  If not, return false
      // if there is no endDate filter, return true
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(dateMoment, "day")
        : true;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      // Only include expenses that match the following
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.date < b.date ? 1 : -1; // Most recent first
      }

      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1; // Most expensive first
      }

      return 0;
    });
};
