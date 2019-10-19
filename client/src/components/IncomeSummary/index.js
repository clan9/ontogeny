import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import numeral from "numeral";
import selectIncomes from "../../selectors/selectExpenses";
import selectIncomesTotal from "../../selectors/selectedExpensesTotal";

require("numeral/locales/en-gb");
numeral.locale("en-gb");

export class IncomeSummary extends Component {
  static propTypes = {
    incomeCount: PropTypes.number,
    incomeTotal: PropTypes.number
  };

  render() {
    const incomeWord = this.props.incomeCount === 1 ? "income" : "incomes";
    const formattedIncomesTotal = numeral(this.props.incomeTotal / 100).format(
      "$0,0.00"
    );

    return (
      <div data-test="summary-component">
        <div>
          <h1 data-test="heading">
            Viewing <span>{this.props.incomeCount}</span> {incomeWord} totalling{" "}
            <span>{formattedIncomesTotal}</span>
          </h1>
        </div>
        <div>
          <Link to="/createIncome" data-test="add-income">
            Add Income
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const visibleIncomes = selectIncomes(state.income, state.filters);

  return {
    incomeCount: visibleIncomes.length,
    incomeTotal: selectIncomesTotal(visibleIncomes)
  };
};

export default connect(mapStateToProps)(IncomeSummary);
