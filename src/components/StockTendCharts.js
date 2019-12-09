import React from "react";
import StockAreaChart from "./StockAreaChart";
import { trends } from "../constants";
import { getTends, getCompleteData } from "../utils";
import "./StockTrendChart.scss";

export default class StockTrendChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.symbol,
      trendType: trends.TIME_SERIES_DAILY,
      data: {}
    };
  }

  getNewSymbolChart = async _ => {
    // let data = await getTends(this.props.symbol, this.state.trendType);
    // this.setState({
    //   data: data
    // });
    let data = await getCompleteData(
      this.props.symbol,
      this.state.trendType.range,
      ["chart"]
    );
    console.log(data);
    this.setState({
      data: data["chart"]
    });
    this.props.onUpdate(data["chart"]);
  };

  componentDidUpdate(prevState, prevProps) {
    console.log(`${prevState.symbol} -- ${this.props.symbol}`);
    if (prevState.symbol.toLowerCase() !== this.props.symbol.toLowerCase()) {
      console.log(`Getting trend data for ${this.props.symbol}`);
      this.getNewSymbolChart();
    }
  }

  updateData = trend => {
    this.setState(
      {
        trendType: trend
      },
      this.getNewSymbolChart
    );
  };

  render() {
    console.log(this.state.trendType);
    return (
      <div class="stockChart-container">
        <div className="stockChart-trends">
          {Object.keys(trends)
            .filter(key => trends[key].enabled)
            .sort((a, b) => (trends[a].rank > trends[b].rank ? 1 : -1))
            .map(key => {
              return (
                <p
                  className={`trend--selector ${this.state.trendType
                    .function === trends[key].function && "selected"}`}
                  onClick={() => {
                    this.updateData(trends[key]);
                  }}
                >
                  {trends[key].name}
                </p>
              );
            })}
        </div>
        <div className="stockChart--chart">
          <StockAreaChart data={this.state.data} height={250} width={450} />
        </div>
      </div>
    );
  }
}
