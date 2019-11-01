import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { fetchUserExpenses } from "../../actions/expenses/expenses";
import { fetchUserIncomes } from "../../actions/income/income";
import { setStartDate, setEndDate } from "../../actions/filters/filters";
import getVisibleRecords from "../../selectors/dashboardRecordSelector";
import getTotal from "../../selectors/selectedExpensesTotal";
import UserNavBar from "../UserNavbar.js";
import DoughnutChart from "../DoughnutChart";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import "./styles.scss";

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
    filters: PropTypes.object,
    expensesTotal: PropTypes.number,
    incomeTotal: PropTypes.number,
    fetchUserExpenses: PropTypes.func,
    fetchUserIncomes: PropTypes.func,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func
  };

  renderData = () => {
    return this.props.expenses.length === 0 &&
      this.props.income.length === 0 ? (
      <div data-test="no-content">
        <span className="user-stats__no-content">No information to show</span>
      </div>
    ) : (
      <div data-test="content-to-show" className="user-stats__data">
        <div className="user-stats__data user-stats__data--main">
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
            colors={["#3c9d9b", "#394a6d"]}
            className="user-stats__doughnut"
            data-test="doughnut-user"
          />
        </div>
        <div className="user-stats__data user-stats__data--sub">
          <BarChart
            expenses={this.props.expenses}
            income={this.props.income}
            className="user-stats__bar"
            data-test="barchart-user"
          />
        </div>
        <div className="user-stats__data user-stats__data--sub">
          <LineChart
            expenses={this.props.expenses}
            income={this.props.income}
            className="user-stats__line"
            data-test="linechart-user"
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <UserNavBar />
        <div data-test="dash-component" className="user-stats container">
          <h1 data-test="header" className="user-stats__header">
            Compare your income to expenses
          </h1>
          <div data-test="date-range-picker" className="user-stats__dates">
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
      </Fragment>
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
