import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import "./styles.scss";

require("numeral/locales/en-gb");
numeral.locale("en-gb");

const ExpenseListItem = ({ expense }) => {
  return (
    <Link
      data-test="expense-component"
      to={`/editExpense/${expense._id}`}
      className="record-item"
    >
      <div data-test="description-date-div">
        <h3 data-test="description" className="record-item__description">
          {expense.description}
        </h3>
        <span data-test="date" className="record-item__date">
          {moment(expense.date).format("Do MMMM YYYY")}
        </span>
      </div>
      <h3 data-test="amount" className="record-item__amount">
        {numeral(expense.amount / 100).format("$0,0.00")}
      </h3>
    </Link>
  );
};

ExpenseListItem.propTypes = {
  expense: PropTypes.object
};

export default ExpenseListItem;
