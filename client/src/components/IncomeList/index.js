import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserIncomes } from "../../actions/income/income";
import selectIncomes from "../../selectors/selectExpenses";
import IncomeListItem from "../IncomeListItem";

export class IncomeList extends Component {
  componentDidMount() {
    this.props.fetchUserIncomes();
  }

  static propTypes = {
    income: PropTypes.array,
    fetchUserIncomes: PropTypes.func
  };

  render() {
    return (
      <div data-test="income-list-component">
        {this.props.income.length === 0 ? (
          <div data-test="no-incomes-msg">
            <span className="no-expenses-msg">No incomes</span>
          </div>
        ) : (
          this.props.income.map(income => (
            <IncomeListItem
              data-test="income-list-item"
              key={income._id}
              income={income}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  income: selectIncomes(state.income, state.filters)
});

export default connect(
  mapStateToProps,
  { fetchUserIncomes }
)(IncomeList);
