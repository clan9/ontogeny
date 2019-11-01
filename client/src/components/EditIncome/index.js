import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editIncome, deleteIncome } from "../../actions/income/income";
import UserNavBar from "../UserNavbar.js";
import RecordForm from "../RecordForm";
// import "./styles.scss";

export class EditIncome extends Component {
  static propTypes = {
    expense: PropTypes.object,
    editExpense: PropTypes.func,
    deleteExpense: PropTypes.func,
    isAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <div data-test="edit-income-component">
        <UserNavBar />
        <div data-test="header" className="edit-record__header container">
          <h1>Edit your income</h1>
        </div>
        <div data-test="record-form">
          <RecordForm
            isAuthenticated={this.props.isAuthenticated}
            record={this.props.income}
            onSubmit={income => {
              this.props.editIncome(income, this.props.income._id);
              this.props.history.push("/income");
            }}
          />
        </div>
        <div data-test="remove-income" className="delete-record">
          <button
            className="delete-record__button"
            onClick={() => {
              this.props.deleteIncome(this.props.income._id);
              this.props.history.push("/income");
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
  income: state.income.find(income => income._id === ownProps.match.params.id),
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editIncome, deleteIncome }
)(EditIncome);
