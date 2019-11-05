import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import "./styles.scss";

export default class DoughNutChart extends Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "doughnut",
      data: {
        labels: this.props.data.map(record => record.title),
        datasets: [
          {
            data: this.props.data.map(record => record.total / 100),
            backgroundColor: this.props.colors
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const index = tooltipItem.index;
              return `${data.labels[index]} Total: £${Number(
                data.datasets[0].data[index]
              ).toFixed(2)}`;
            }
          }
        }
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
    data: PropTypes.array,
    colors: PropTypes.array
  };

  render() {
    return <canvas height="300px" ref={this.chartRef} />;
  }
}
