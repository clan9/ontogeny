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
    return <canvas ref={this.canvasRef} />;
  }
}
