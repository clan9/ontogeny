import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserExpenses } from "../../actions/expenses/expenses";
import { fetchUserIncomes } from "../../actions/income/income";
import getVisibleRecords from "../../selectors/selectExpenses";
import { DateRangePicker } from "react-dates";
import { setStartDate, setEndDate } from "../../actions/filters/filters";
import RecordBarChart from "../RecordBarChart";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarFocused: null
    };
  }

  componentDidMount() {
    this.props.fetchUserExpenses();
    this.props.fetchUserIncomes();
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  static propTypes = {
    expenses: PropTypes.array,
    income: PropTypes.array,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func
  };

  renderData = () =>
    this.props.expenses.length === 0 && this.props.income.length === 0 ? (
      <div>
        <span>No information to show</span>
      </div>
    ) : (
      <div>
        <RecordBarChart data={this.props.expenses} />
        <RecordBarChart data={this.props.income} />
      </div>
    );

  render() {
    return (
      <div>
        <h1>Compare your income to expenses</h1>
        <div data-test="date-range-picker">
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
        {this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: getVisibleRecords(state.expenses, state.filters),
  income: getVisibleRecords(state.income, state.filters),
  filters: state.filters
});

export default connect(
  mapStateToProps,
  {
    fetchUserExpenses,
    fetchUserIncomes,
    setStartDate,
    setEndDate
  }
)(Dashboard);
