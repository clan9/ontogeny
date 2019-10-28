import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { fetchAllExpenses } from "../../actions/expenses/expenses";
import { fetchAllIncomes } from "../../actions/income/income";
import { setStartDate, setEndDate } from "../../actions/filters/filters";
import {
  getUserNamesSet,
  getDataForUsers,
  getTotalsByUser
} from "../../selectors/sortRecordsByUser";
import getVisibleRecords from "../../selectors/selectExpenses";
import getTotal from "../../selectors/selectedExpensesTotal";
import BarChart from "../BarChart";
import DoughnutChart from "../DoughnutChart";
import LineChart from "../LineChart";

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarFocused: null
    };
  }

  componentDidMount() {
    this.props.fetchAllExpenses();
    this.props.fetchAllIncomes();
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  filterDataByUser = () => {
    const userNamesSet = getUserNamesSet([
      this.props.expenses,
      this.props.income
    ]);
    const dataForUsers = getDataForUsers(
      userNamesSet,
      this.props.expenses,
      this.props.income
    );
    return dataForUsers;
  };

  getUserTotals = () => {
    const userData = this.filterDataByUser();
    return getTotalsByUser(userData, getTotal);
  };

  static propTypes = {
    expenses: PropTypes.array,
    income: PropTypes.array,
    filters: PropTypes.object,
    fetchAllIncomes: PropTypes.func,
    fetchAllExpenses: PropTypes.func,
    getTotal: PropTypes.func,
    getVisibleRecords: PropTypes.func,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    expensesTotal: PropTypes.number,
    incomeTotal: PropTypes.number
  };

  renderData() {
    return this.props.expenses.length === 0 &&
      this.props.income.length === 0 ? (
      <div data-test="no-content">
        <span>No information to show</span>
      </div>
    ) : (
      <div data-test="content-to-show">
        <div data-test="stats-all-users">
          <h2 data-test="sub-heading-1">Overall Totals (All users)</h2>
          <DoughnutChart
            data={[
              {
                title: "Income",
                total: this.props.incomeTotal
              },
              {
                title: "Expenses",
                total: this.props.expensesTotal
              }
            ]}
            colors={["#bbb6DF", "#70cad1"]}
            data-test="doughnut-all-users"
          />
          <BarChart
            expenses={this.props.expenses}
            income={this.props.income}
            data-test="barchart-all-users"
          />
          <LineChart
            expenses={this.props.expenses}
            income={this.props.income}
            data-test="linechart-all-users"
          />
        </div>
        <div data-test="stats-per-user">
          <h2 data-test="sub-heading-2">Expenses and Income by user</h2>
          {this.getUserTotals().map((user, index) => {
            const { name, expensesTotal, incomeTotal } = user;
            return (
              <div key={index}>
                <p>Data for {name}</p>
                <div>
                  <DoughnutChart
                    data={[
                      { title: "Income", total: incomeTotal },
                      { title: "Expenses", total: expensesTotal }
                    ]}
                    colors={["#bbb6DF", "#70cad1"]}
                    data-test="doughnut-user"
                  />
                  <BarChart
                    expenses={this.filterDataByUser()[index].expenses}
                    income={this.filterDataByUser()[index].income}
                    data-test="barchart-user"
                  />
                  <LineChart
                    expenses={this.filterDataByUser()[index].expenses}
                    income={this.filterDataByUser()[index].income}
                    data-test="linechart-user"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div data-test="admin-dash-component">
        <h1 data-test="header">User statistics</h1>
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
    fetchAllExpenses,
    fetchAllIncomes,
    getTotal,
    setEndDate,
    setStartDate
  }
)(AdminDashboard);
