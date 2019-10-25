import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Chart from "chart.js";
import { connect } from "react-redux";
import { fetchAllExpenses } from "../../actions/expenses/expenses";
import { fetchAllIncomes } from "../../actions/income/income";

export class TestBarChart extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const myLabels1 = this.props.income.map(record => moment(record.date));
    const myLabels2 = this.props.expenses.map(record => moment(record.date));
    const myLabels3 = [...myLabels1, ...myLabels2].sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    const myLabels4 = myLabels3.map(date => moment(date).format("DD MMM"));
    console.log("Labels 3: ", myLabels3);
    console.log("Labels 4: ", myLabels4);

    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: myLabels4,
        datasets: [
          {
            label: "Income",
            data: this.props.income.map(record => record.amount / 100),
            backgroundColor: "#bbb6DF"
          },
          {
            label: "Expenses",
            data: this.props.expenses.map(record => record.amount / 100),
            backgroundColor: "#70cad1"
          }
        ]
      }
      // options: {
      //   tooltips: {
      //     callbacks: {
      //       label: function(tooltipItem, data) {
      //         return
      //       }
      //     }
      //   }
      // }
    });
  }

  componentDidUpdate() {
    const myLabels1 = this.props.income.map(record => moment(record.date));

    const myLabels2 = this.props.expenses.map(record => moment(record.date));

    const myLabels3 = [...myLabels1, ...myLabels2].sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const myLabels4 = myLabels3.map(date => moment(date).format("DD MMM"));
    console.log("Updated Labels 3: ", myLabels3);
    console.log("Updated Labels 4: ", myLabels4);

    this.myChart.data.labels = myLabels4;

    this.myChart.data.datasets[0].data = this.props.income.map(
      record => record.amount / 100
    );
    this.myChart.data.datasets[1].data = this.props.expenses.map(
      record => record.amount / 100
    );
    this.myChart.update();
  }

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    color: PropTypes.string
  };

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default connect(
  null,
  { fetchAllExpenses, fetchAllIncomes }
)(TestBarChart);
