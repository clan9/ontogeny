import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import {
  sortDates,
  summedTotalsForDates
} from "../../selectors/sortDatesAndSumTotals";

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const dates = sortDates(this.props.expenses, this.props.income);
    const { summedExpenses, summedIncome } = summedTotalsForDates(
      this.props.expenses,
      this.props.income
    );
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Income",
            data: summedIncome.map(income => income.incomeTotal),
            backgroundColor: "#3c9d9b"
          },
          {
            label: "Expenses",
            data: summedExpenses.map(expense => expense.expenseTotal),
            backgroundColor: "#394a6d"
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        tooltips: {
          callbacks: {
            label: tooltipItem => {
              return `£${Number(tooltipItem.yLabel).toFixed(2)}`;
            }
          }
        }
      }
    });
  }

  componentDidUpdate() {
    const dates = sortDates(this.props.expenses, this.props.income);
    const { summedExpenses, summedIncome } = summedTotalsForDates(
      this.props.expenses,
      this.props.income
    );
    this.myChart.data.labels = dates;
    this.myChart.data.datasets[0].data = summedIncome.map(
      income => income.incomeTotal
    );
    this.myChart.data.datasets[1].data = summedExpenses.map(
      expense => expense.expenseTotal
    );
    this.myChart.update();
  }

  static propTypes = {
    expenses: PropTypes.array,
    income: PropTypes.array,
    sortDates: PropTypes.func,
    summedTotalsForDates: PropTypes.func
  };

  render() {
    return <canvas height="300px" ref={this.canvasRef} />;
  }
}
