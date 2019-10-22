import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

export default class UserPieChart extends Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "pie",
      data: {
        labels: this.props.data.map(record => record.title),
        datasets: [
          {
            data: this.props.data.map(record => record.total / 100),
            backgroundColor: this.props.colors
          }
        ]
      }
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(record => record.title);
    this.myChart.data.datasets[0].data = this.props.data.map(
      record => record.total / 100
    );
    this.myChart.update();
  }

  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
