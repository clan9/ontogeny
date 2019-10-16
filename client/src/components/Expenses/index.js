import React, { Component } from "react";
// import PropTypes from "prop-types";
import ExpenseList from "../ExpenseList";

export default class Expenses extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    return (
      <div>
        <p>This is the Expenses page</p>
        <ExpenseList />
      </div>
    );
  }
}
