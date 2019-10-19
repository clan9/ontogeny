import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editIncome, deleteIncome } from "../../actions/income/income";
import RecordForm from "../RecordForm";

export class EditIncome extends Component {
  static propTypes = {
    expense: PropTypes.object,
    editExpense: PropTypes.func,
    deleteExpense: PropTypes.func
  };

  render() {
    return (
      <div data-test="edit-income-component">
        <div data-test="header">
          <h1>Edit your income</h1>
        </div>
        <div data-test="record-form">
          <RecordForm
            record={this.props.income}
            onSubmit={income => {
              this.props.editIncome(income, this.props.income._id);
              this.props.history.push("/income");
            }}
          />
        </div>
        <div data-test="remove-income">
          <button
            onClick={() => {
              this.props.deleteIncome(this.props.income._id);
              this.props.history.push("/income");
            }}
          >
            Remove Income
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  income: state.income.find(income => income._id === ownProps.match.params.id)
});

export default connect(
  mapStateToProps,
  { editIncome, deleteIncome }
)(EditIncome);
