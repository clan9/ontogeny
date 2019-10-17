import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editExpense, deleteExpense } from "../../actions/expenses/expenses";
import ExpenseForm from "../ExpenseForm";

export class EditExpense extends Component {
  static propTypes = {
    expense: PropTypes.object,
    editExpense: PropTypes.func,
    deleteExpense: PropTypes.func
  };

  render() {
    return (
      <div data-test="edit-expense-component">
        <div data-test="header">
          <h1>Edit your expense</h1>
        </div>
        <div data-test="expense-form">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={expense => {
              this.props.editExpense(expense, this.props.expense._id);
              this.props.history.push("/menu");
            }}
          />
        </div>
        <div data-test="remove-expense">
          <button
            onClick={() => {
              this.props.deleteExpense(this.props.expense._id);
              this.props.history.push("/menu");
            }}
          >
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  expense: state.expenses.find(
    expense => expense._id === ownProps.match.params.id
  )
});

export default connect(
  mapStateToProps,
  { editExpense, deleteExpense }
)(EditExpense);
