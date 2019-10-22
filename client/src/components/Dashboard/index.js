import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { fetchUserExpenses } from "../../actions/expenses/expenses";
import { fetchUserIncomes } from "../../actions/income/income";
import { setStartDate, setEndDate } from "../../actions/filters/filters";
import getVisibleRecords from "../../selectors/dashboardRecordSelector";
import getTotal from "../../selectors/selectedExpensesTotal";
import UserBarChart from "../UserBarChart";
import UserPieChart from "../UserPieChart";

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
    expensesTotal: PropTypes.number,
    incomeTotal: PropTypes.number,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func
  };

  renderData = () => {
    return this.props.expenses.length === 0 &&
      this.props.income.length === 0 ? (
      <div>
        <span>No information to show</span>
      </div>
    ) : (
      <div>
        <UserPieChart
          data={[
            {
              title: "Expenses",
              total: this.props.expensesTotal
            },
            {
              title: "Income",
              total: this.props.incomeTotal
            }
          ]}
          colors={["#70cad1", "#bbb6DF"]}
        />

        <h2>Expenses</h2>
        <UserBarChart
          data={this.props.expenses}
          title="expenses"
          color="#70cad1"
        />

        <h2>Income</h2>
        <UserBarChart data={this.props.income} title="income" color="#bbb6df" />
      </div>
    );
  };

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

const mapStateToProps = state => {
  const expenses = getVisibleRecords(state.expenses, state.filters);
  const income = getVisibleRecords(state.income, state.filters);
  const filters = state.filters;

  return {
    expenses,
    income,
    filters,
    expensesTotal: getTotal(expenses),
    incomeTotal: getTotal(income)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUserExpenses,
    fetchUserIncomes,
    getTotal,
    setStartDate,
    setEndDate
  }
)(Dashboard);
