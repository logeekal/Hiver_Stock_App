import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    date: "Page A",
    high: 4000,
    low: 2400,
    mid: 2400
  },
  {
    date: "Page B",
    high: 3000,
    low: 1398,
    mid: 2210
  },
  {
    date: "Page C",
    high: 2000,
    low: 9800,
    mid: 2290
  },
  {
    date: "Page D",
    high: 2780,
    low: 3908,
    mid: 2000
  },
  {
    date: "Page E",
    high: 1890,
    low: 4800,
    mid: 2181
  },
  {
    date: "Page F",
    high: 2390,
    low: 3800,
    mid: 2500
  },
  {
    date: "Page G",
    high: 3490,
    low: 4300,
    mid: 2100
  }
];

export default class StockAreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.data);
    if (Object.keys(this.props.data).length === 0) {
      return <p>Please select a stock</p>;
    }
    return (
      <AreaChart
        width={this.props.width}
        height={this.props.height}
        data={this.props.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={false} interval={"preserveStartEnd"} />
        <YAxis type="number" />

        <Tooltip />
        <Area type="monotone" dataKey="high" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="close" stroke="#ffc658" fill="#ffc658" />
        <Area type="monotone" dataKey="low" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    );
  }
}
