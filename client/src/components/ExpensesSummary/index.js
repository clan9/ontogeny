import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../../selectors/selectExpenses";
import selectExpensesTotal from "../../selectors/selectedExpensesTotal";

require("numeral/locales/en-gb");
numeral.locale("en-gb");

export class ExpensesSummary extends Component {
  static propTypes = {
    expenseCount: PropTypes.number,
    expenseTotal: PropTypes.number
  };

  render() {
    const expenseWord = this.props.expenseCount === 1 ? "expense" : "expenses";
    const formattedExpensesTotal = numeral(
      this.props.expenseTotal / 100
    ).format("$0,0.00");

    return (
      <div data-test="summary-component">
        <div>
          <h1 data-test="heading">
            Viewing <span>{this.props.expenseCount}</span> {expenseWord}{" "}
            totalling <span>{formattedExpensesTotal}</span>
          </h1>
        </div>
        <div>
          <Link to="/createExpense" data-test="add-expense">
            Add Expense
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import numeral from "numeral";
// import selectExpenses from "../../selectors/selectExpenses";
// import selectExpensesTotal from "../../selectors/selectedExpensesTotal";

// require("numeral/locales/en-gb");
// numeral.locale("en-gb");

// export const ExpensesSummary = ({ expenseCount, expenseTotal }) => {
//   const expenseWord = expenseCount === 1 ? "expense" : "expenses";
//   const formattedExpensesTotal = numeral(expenseTotal / 100).format("$0,0.00");

//   return (
//     <div data-test="summary-component">
//       <div>
//         <h1 data-test="heading">
//           Viewing <span>{expenseCount}</span> {expenseWord} totalling{" "}
//           <span>{formattedExpensesTotal}</span>
//         </h1>
//       </div>
//       <div>
//         <Link to="/create" data-test="add-expense">
//           Add Expense
//         </Link>
//       </div>
//     </div>
//   );
// };

// ExpensesSummary.propTypes = {
//   expenseCount: PropTypes.number,
//   expenseTotal: PropTypes.number
// };

// const mapStateToProps = state => {
//   const visibleExpenses = selectExpenses(state.expenses, state.filters);

//   return {
//     expenseCount: visibleExpenses.length,
//     expenseTotal: selectExpensesTotal(visibleExpenses)
//   };
// };

// export default connect(mapStateToProps)(ExpensesSummary);
