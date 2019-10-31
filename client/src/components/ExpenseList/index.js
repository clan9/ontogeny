import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserExpenses } from "../../actions/expenses/expenses";
import selectExpenses from "../../selectors/selectExpenses";
import ExpenseListItem from "../ExpenseListItem";
import "./styles.scss";

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
        {this.props.expenses.length === 0 ? (
          <div>
            <span data-test="no-expenses-msg" className="no-expenses-msg">
              No expenses to show
            </span>
          </div>
        ) : (
          this.props.expenses.map(expense => (
            <ExpenseListItem
              data-test="expense-list-item"
              key={expense._id}
              expense={expense}
            />
          ))
        )}
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
