import React from "react";
import ReactTable from "react-table-v6";
import "./StockKPIS.css";
import { dummydata } from "../utils/data";

export default class StockKPIs extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <ReactTable
        className="-striped -highlight"
        filterable
        data={this.props.KPIData}
        defaultPageSize={5}
        columns={[
          {
            Header: "Date/Time",
            accessor: "label"
          },
          {
            Header: "Open Price",
            accessor: "open"
          },
          {
            Header: "Close Price",
            accessor: "close"
          },
          {
            Header: "High ",
            accessor: "high"
          },
          {
            Header: "Low ",
            accessor: "low"
          },
          {
            Header: "Volume Traded",
            accessor: "volume"
          }
        ]}
      />
    );
  }
}
