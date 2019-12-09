import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import StockFacts from "./components/StockFacts";
import StockAreaChart from "./components/StockAreaChart";
import StockTrendChart from "./components/StockTendCharts";
import { debounce } from "lodash";
import { getSearchResults } from "./utils";
import StockKPIs from "./components/StockKPIS";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSymbol: "",
      searchSymbol: "",
      top5Matches: [],
      data: []
    };
  }

  updateData = data => {
    this.setState({
      data: data
    });
  };

  handleSearch = symbol => {
    this.setState({
      searchSymbol: symbol,
      currentSymbol: symbol,
      top5Matches: null,
      data: []
    });
  };

  handleSymbolSearch = async e => {
    this.setState(
      {
        currentSymbol: e.target.value,
        top5Matches: null
      },
      () => {
        console.log(`Now symbol is ${this.state.currentSymbol}`);
      }
    );
    if (e.target.value.length > 1) {
      console.log(`Getting suggestions for ${e.target.value}`);
      let results = await getSearchResults(e.target.value);
      console.log("Got Search Results in main page");
      console.log(results);
      let newMatches = [];
      if (results && "bestMatches" in results) {
        results.bestMatches.slice(0, 5).map(result => {
          newMatches.push({
            symbol: result["1. symbol"],
            name: result["2. name"]
          });
        });
        this.setState({
          top5Matches: newMatches
        });
      } else {
        this.setState({
          top5Matches: []
        });
      }
    }
  };

  render() {
    return (
      <div className="StockApp">
        <div className="StockApp__search--container">
          <div className="StockApp__search--input">
            <input
              type="text"
              name="stock-search"
              value={this.state.currentSymbol}
              placeholder={"Type Company Name/Symbol"}
              onChange={this.handleSymbolSearch}
            />
            {this.state.top5Matches && (
              <React.Fragment>
                <div className="StockApp__suggestions-container">
                  {this.state.top5Matches.map(match => {
                    return (
                      <div
                        class="suggestions"
                        onClick={() => {
                          this.handleSearch(match.symbol);
                        }}
                      >
                        <span>{match.name}</span>
                        <span>{match.symbol}</span>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            )}
          </div>
          <button onClick={debounce(this.handleSearch, 500)}>Search</button>
        </div>
        <div className="stockApp__summary--container">
          <StockFacts symbol={this.state.searchSymbol} />
          <StockTrendChart
            symbol={this.state.searchSymbol}
            onUpdate={this.updateData}
          />
        </div>
        <div className="stockApp__detail--chart">
          <StockKPIs KPIData={this.state.data} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
