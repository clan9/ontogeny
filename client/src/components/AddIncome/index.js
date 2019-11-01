import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addIncome } from "../../actions/income/income";
import UserNavBar from "../UserNavbar.js";
import RecordForm from "../RecordForm";

export class AddIncome extends Component {
  static propTypes = {
    addIncome: PropTypes.func,
    isAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <Fragment>
        <UserNavBar />
        <div data-test="add-income-component" className="container">
          <div data-test="header">
            <h1 className="add-record-header">Add an income</h1>
          </div>
          <div data-test="record-form">
            <RecordForm
              isAuthenticated={this.props.isAuthenticated}
              onSubmit={income => {
                this.props.addIncome(income);
                this.props.history.push("/income");
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addIncome }
)(AddIncome);
