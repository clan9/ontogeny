import React, { Component } from "react";
// import PropTypes from "prop-types";
import ExpensesSummary from "../ExpensesSummary";
import ExpenseList from "../ExpenseList";

export default class Expenses extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    return (
      <div>
        <ExpensesSummary />
        <ExpenseList />
      </div>
    );
  }
}
