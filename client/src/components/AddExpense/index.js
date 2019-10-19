import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExpense } from "../../actions/expenses/expenses";
import RecordForm from "../RecordForm";

export class AddExpense extends Component {
  static propTypes = {
    addExpense: PropTypes.func
  };

  render() {
    return (
      <div data-test="add-expense-component">
        <div data-test="header">
          <h1>Add an expense</h1>
        </div>
        <div data-test="record-form">
          <RecordForm
            onSubmit={expense => {
              this.props.addExpense(expense);
              this.props.history.push("/expenses");
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addExpense }
)(AddExpense);
