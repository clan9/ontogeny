import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import moment from "moment";
import numeral from "numeral";
import PropTypes from "prop-types";

require("numeral/locales/en-gb");
numeral.locale("en-gb");

export default class RecordBarChart extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  render() {
    const formattedData = this.props.data.map(record => {
      return {
        ...record,
        date: moment(record.date).format("D MMM"),
        amount: (record.amount / 100).toFixed(2)
      };
    });
    return (
      <BarChart
        width={500}
        height={500}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
          left: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    );
  }
}

// <Bar dataKey="amount" fill="#82ca9d" />
