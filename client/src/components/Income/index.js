import React from "react";
import { Link } from "react-router-dom";
import IncomeSummary from "../IncomeSummary";
import IncomeListFilters from "../ExpenseListFilters";
import IncomeList from "../IncomeList";

const Income = () => {
  return (
    <div data-test="income-component">
      <IncomeSummary data-test="summary" />
      <IncomeListFilters data-test="filters" />
      <IncomeList data-test="list" />
      <Link data-test="menu-link" to="/menu">
        Main menu
      </Link>
    </div>
  );
};

export default Income;
