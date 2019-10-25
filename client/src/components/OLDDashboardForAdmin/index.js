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
import UserDoughnutChart from "../UserDoughnutChart";
import AdminDoughnutChartOne from "../OLDAdminDoughnutOne";
import AdminBarChart from "../OLDAdminBarChart";
import TestBarChart from "../TestBarChart";

export class DashboardForAdmin extends Component {
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

  static propTypes = {
    fetchAllIncomes: PropTypes.func,
    fetchAllExpenses: PropTypes.func,
    getTotal: PropTypes.func,
    getVisibleRecords: PropTypes.func,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    expenses: PropTypes.array,
    income: PropTypes.array,
    expensesTotal: PropTypes.number,
    incomeTotal: PropTypes.number
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

  renderData = () => {
    return this.props.expenses.length === 0 &&
      this.props.income.length === 0 ? (
      <div>
        <span>No information to show</span>
      </div>
    ) : (
      <div>
        <div>
          <h2>Overall Totals (All users)</h2>
          <UserDoughnutChart
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
          />
          <h2>Income</h2>
          <AdminBarChart
            data={this.props.income.sort((a, b) => {
              if (a.date < b.date) {
                return -1;
              } else if (a.date > b.data) {
                return 1;
              } else {
                return 0;
              }
            })}
            title="Income"
            color="#bbb6df"
          />
          <h2>Expenses</h2>
          <AdminBarChart
            data={this.props.expenses.sort((a, b) => {
              if (a.date < b.date) {
                return -1;
              } else if (a.date > b.data) {
                return 1;
              } else {
                return 0;
              }
            })}
            title="Expenses"
            color="#70cad1"
          />
          <TestBarChart
            expenses={this.props.expenses}
            income={this.props.income}
          />
        </div>
        <div>
          <h2>Expenses and Income by user</h2>
          {this.getUserTotals().map((user, index) => {
            const { name, expensesTotal, incomeTotal } = user;

            return (
              <div key={index}>
                <p>Data for {name}</p>
                <AdminDoughnutChartOne
                  data={[
                    {
                      title: "Income",
                      total: incomeTotal
                    },
                    {
                      title: "Expenses",
                      total: expensesTotal
                    }
                  ]}
                  colors={["#bbb6DF", "#70cad1"]}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>User statistics</h1>
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
)(DashboardForAdmin);
