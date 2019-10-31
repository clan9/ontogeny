import React, { Fragment } from "react";
import UserNavBar from "../UserNavbar.js";
import ExpensesSummary from "../ExpensesSummary";
import ExpenseListFilters from "../ExpenseListFilters";
import ExpenseList from "../ExpenseList";

const Expenses = () => {
  return (
    <Fragment>
      <UserNavBar />
      <div data-test="expenses-component" className="container">
        <ExpensesSummary data-test="summary" />
        <ExpenseListFilters data-test="filters" />
        <ExpenseList data-test="list" />
      </div>
    </Fragment>
  );
};

export default Expenses;
