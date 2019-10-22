import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import numeral from "numeral";
import Chart from "chart.js";

require("numeral/locales/en-gb");
numeral.locale("en-gb");

export default class UserBarChart extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: this.props.data.map(record =>
          moment(record.date).format("Do MMM")
        ),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map(record =>
              (record.amount / 100).toFixed(2)
            ),
            backgroundColor: this.props.color
          }
        ]
      }
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(record =>
      moment(record.date).format("Do MMM")
    );
    this.myChart.data.datasets[0].data = this.props.data.map(record =>
      (record.amount / 100).toFixed(2)
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
