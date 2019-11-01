import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

require("numeral/locales/en-gb");
numeral.locale("en-gb");

const IncomeListItem = ({ income }) => {
  return (
    <Link
      data-test="income-component"
      to={`/editIncome/${income._id}`}
      className="record-item"
    >
      <div data-test="description-date-div">
        <h3 data-test="description" className="record-item__description">
          {income.description}
        </h3>
        <span data-test="date" className="record-item__date">
          {moment(income.date).format("Do MMMM YYYY")}
        </span>
      </div>
      <h3 data-test="amount" className="record-item__amount">
        {numeral(income.amount / 100).format("$0,0.00")}
      </h3>
    </Link>
  );
};

IncomeListItem.propTypes = {
  income: PropTypes.object
};

export default IncomeListItem;
