import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editExpense, deleteExpense } from "../../actions/expenses/expenses";
import UserNavBar from "../UserNavbar.js";
import RecordForm from "../RecordForm";
import "./styles.scss";

export class EditExpense extends Component {
  static propTypes = {
    expense: PropTypes.object,
    editExpense: PropTypes.func,
    deleteExpense: PropTypes.func,
    isAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <div data-test="edit-expense-component">
        <UserNavBar />
        <div data-test="header" className="edit-record__header container">
          <h1>Edit your expense</h1>
        </div>
        <div data-test="expense-form">
          <RecordForm
            isAuthenticated={this.props.isAuthenticated}
            record={this.props.expense}
            onSubmit={expense => {
              this.props.editExpense(expense, this.props.expense._id);
              this.props.history.push("/expenses");
            }}
          />
        </div>
        <div data-test="remove-expense" className="delete-record">
          <button
            className="delete-record__button"
            onClick={() => {
              this.props.deleteExpense(this.props.expense._id);
              this.props.history.push("/expenses");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  expense: state.expenses.find(
    expense => expense._id === ownProps.match.params.id
  ),
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editExpense, deleteExpense }
)(EditExpense);
