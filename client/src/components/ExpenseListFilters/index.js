import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate
} from "../../actions/filters/filters";
import "./styles.scss";

export class ExpenseListFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarFocused: null
    };
  }

  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = e => {
    e.target.value === "date"
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  static propTypes = {
    filters: PropTypes.object,
    setTextFilter: PropTypes.func,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    sortByAmount: PropTypes.func,
    sortByDate: PropTypes.func
  };

  render() {
    return (
      <div data-test="expense-filters-component">
        <div className="expense-filters">
          <input
            type="text"
            data-test="text-input"
            className="expense-filters__text"
            placeholder="Search Expenses"
            value={this.props.filters.text}
            onChange={this.onTextChange}
          />
          <select
            data-test="sort-by"
            className="expense-filters__sortBy"
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <DateRangePicker
            startDateId="start"
            endDateId="end"
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            displayFormat={() => "DD/MM/YYYY"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(
  mapStateToProps,
  {
    setTextFilter,
    setStartDate,
    setEndDate,
    sortByAmount,
    sortByDate
  }
)(ExpenseListFilters);
