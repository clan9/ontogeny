import React from "react";
import ExpensesSummary from "../ExpensesSummary";
import ExpenseListFilters from "../ExpenseListFilters";
import ExpenseList from "../ExpenseList";

const Expenses = () => {
  return (
    <div>
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};

export default Expenses;

// import React, { Component } from "react";
// import ExpensesSummary from "../ExpensesSummary";
// import ExpenseListFilters from "../ExpenseListFilters";
// import ExpenseList from "../ExpenseList";

// export default class Expenses extends Component {
//   render() {
//     return (
//       <div>
// <ExpensesSummary />
// <ExpenseListFilters />
// <ExpenseList />
//       </div>
//     );
//   }
// }
