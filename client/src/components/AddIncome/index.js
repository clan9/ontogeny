import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addIncome } from "../../actions/income/income";
import RecordForm from "../RecordForm";

export class AddIncome extends Component {
  static propTypes = {
    addIncome: PropTypes.func
  };

  render() {
    return (
      <div data-test="add-income-component">
        <div data-test="header">
          <h1>Add an expense</h1>
        </div>
        <div data-test="record-form">
          <RecordForm
            onSubmit={income => {
              this.props.addIncome(income);
              this.props.history.push("/income");
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addIncome }
)(AddIncome);
