import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import {
  sortDates,
  summedTotalsForDates
} from "../../selectors/sortDatesAndSumTotals";

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const dates = sortDates(this.props.expenses, this.props.income);
    const { summedExpenses, summedIncome } = summedTotalsForDates(
      this.props.expenses,
      this.props.income
    );
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Income",
            data: summedIncome.map(income => income.incomeTotal),
            backgroundColor: "#bbb6df8d"
          },
          {
            label: "Expenses",
            data: summedExpenses.map(expense => expense.expenseTotal),
            backgroundColor: "#70cad18d"
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
    income: PropTypes.array,
    expenses: PropTypes.array
  };

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
