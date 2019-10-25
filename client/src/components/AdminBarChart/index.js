import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Chart from "chart.js";

export default class AdminBarChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const dates = this.sortDates();
    const { summedExpenses, summedIncome } = this.summedTotalsForDates();
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Income",
            data: summedIncome.map(income => income.incomeTotal),
            backgroundColor: "#bbb6df"
          },
          {
            label: "Expenses",
            data: summedExpenses.map(expense => expense.expenseTotal),
            backgroundColor: "#70cad1"
          }
        ]
      }
    });
  }

  componentDidUpdate() {
    const dates = this.sortDates();
    const { summedExpenses, summedIncome } = this.summedTotalsForDates();
    this.myChart.data.labels = dates;
    this.myChart.data.datasets[0].data = summedIncome.map(
      income => income.incomeTotal
    );
    this.myChart.data.datasets[1].data = summedExpenses.map(
      expense => expense.expenseTotal
    );
    this.myChart.update();
  }

  // map through expenses and incomes for their dates
  // return an array of the dates with duplicates removed
  sortDates() {
    const expensesDates = this.props.expenses.map(expense =>
      moment(expense.date).format("DD MMM")
    );
    const incomeDates = this.props.income.map(income =>
      moment(income.date).format("DD MMM")
    );
    const datesSet = new Set([...expensesDates, ...incomeDates]);
    const datesArray = [...datesSet].sort();
    return datesArray;
  }

  // Call the sortDates method, map through the dates
  // for each date, get matching expenses/incomes
  // map through the matches and return the amounts
  // reduce the amounts to get total expenses/incomes per date
  summedTotalsForDates() {
    const { expenses, income } = this.props;
    const summedExpenses = [];
    const summedIncome = [];
    const dates = this.sortDates();
    dates.map(date => {
      const expenseTotal = expenses
        .filter(expense => moment(expense.date).format("DD MMM") === date)
        .map(expense => expense.amount / 100)
        .reduce((total, amount) => total + amount, 0);
      const incomeTotal = income
        .filter(income => moment(income.date).format("DD MMM") === date)
        .map(income => income.amount / 100)
        .reduce((total, amount) => total + amount, 0);

      summedExpenses.push({ date, expenseTotal });
      summedIncome.push({ date, incomeTotal });
      return null;
    });
    return { summedExpenses, summedIncome };
  }

  static propTypes = {
    expenses: PropTypes.array,
    income: PropTypes.array
  };

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
