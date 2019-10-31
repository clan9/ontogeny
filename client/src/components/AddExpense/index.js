import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExpense } from "../../actions/expenses/expenses";
import UserNavBar from "../UserNavbar.js";
import RecordForm from "../RecordForm";
import "./styles.scss";

export class AddExpense extends Component {
  static propTypes = {
    addExpense: PropTypes.func
  };

  render() {
    return (
      <Fragment>
        <UserNavBar />
        <div data-test="add-record-component" className="container">
          <div data-test="header">
            <h1 className="add-record-header">Add an expense</h1>
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
      </Fragment>
    );
  }
}

export default connect(
  null,
  { addExpense }
)(AddExpense);
