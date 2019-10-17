import React from "react";
import { Link } from "react-router-dom";
import ExpensesSummary from "../ExpensesSummary";
import ExpenseListFilters from "../ExpenseListFilters";
import ExpenseList from "../ExpenseList";

const Expenses = () => {
  return (
    <div data-test="expenses-component">
      <ExpensesSummary data-test="summary" />
      <ExpenseListFilters data-test="filters" />
      <ExpenseList data-test="list" />
      <Link to="/menu" data-test="menu-link">
        Main Menu
      </Link>
    </div>
  );
};

export default Expenses;
