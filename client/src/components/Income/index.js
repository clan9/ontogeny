import React, { Fragment } from "react";
import UserNavBar from "../UserNavbar.js";
import IncomeSummary from "../IncomeSummary";
import IncomeListFilters from "../ExpenseListFilters";
import IncomeList from "../IncomeList";

const Income = () => {
  return (
    <Fragment>
      <UserNavBar />
      <div data-test="income-component" className="container">
        <IncomeSummary data-test="summary" />
        <IncomeListFilters data-test="filters" />
        <IncomeList data-test="list" />
      </div>
    </Fragment>
  );
};

export default Income;
