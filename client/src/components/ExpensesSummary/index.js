import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../../selectors/selectExpenses";
import selectExpensesTotal from "../../selectors/selectedExpensesTotal";
import "./styles.scss";

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
      <div data-test="summary-component" className="records-summary">
        <div>
          <h1 data-test="heading" className="records-summary__heading">
            Viewing <span>{this.props.expenseCount}</span> {expenseWord}{" "}
            totalling <span>{formattedExpensesTotal}</span>
          </h1>
        </div>
        <div>
          <Link
            to="/createExpense"
            data-test="add-expense"
            className="records-summary__add-record"
          >
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
