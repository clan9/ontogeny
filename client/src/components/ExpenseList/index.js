import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserExpenses } from "../../actions/expenses/expenses";
import selectExpenses from "../../selectors/selectExpenses";

export class ExpenseList extends Component {
  componentDidMount() {
    this.props.fetchUserExpenses();
  }

  static propTypes = {
    expenses: PropTypes.array,
    fetchUserExpenses: PropTypes.func
  };

  render() {
    return (
      <div data-test="expense-list-component">
        {this.props.expenses.map(expense => (
          <p key={expense._id}>{expense.amount}</p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(
  mapStateToProps,
  { fetchUserExpenses }
)(ExpenseList);
