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
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      data: {
        labels: this.props.data.map(record =>
          moment(record.date).format("Do MMM")
        ),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map(record => record.amount / 100),
            backgroundColor: this.props.color
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

/**
 * 
 * var options = {
    tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return "$" + Number(tooltipItem.yLabel) + " and so worth it !";
                }
            }
        },
            title: {
                      display: true,
                      text: 'Ice Cream Truck',
                      position: 'bottom'
                  },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
    };
 * 
 */
