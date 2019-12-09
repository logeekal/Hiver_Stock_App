import React from "react";
import styled from "styled-components";
import { getSymbolFacts, getSearchResults, getCompleteData } from "../utils";
import { FiChevronsUp, FiChevronsDown } from "react-icons/fi";
import "./StockFacts.scss";

const StockFactsContainer = styled.div`
  width: 350px;

  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 1rem;
  margin: 10px 10px;
  box-shadow: 0.2px 0.2px 3px rgba(0, 0, 0, 0.5);
`;

export default class StockFacts extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      symbol: this.props.sumbol,
      price: "--",
      name: "--",
      change: "",
      changePercent: "",
      dataFetched: false,
      error: "Please select a Stock"
    };

    this.state = this.defaultState;
  }

  componentDidUpdate(prevState, prevProps) {
    // console.log(
    //   `${prevProps.symbol.toLowerCase()} !== ${this.props.symbol.toLowerCase()}`
    // );
    let prevSymbol = prevProps.symbol || "";
    if (
      this.props.symbol &&
      prevSymbol.toLowerCase() !== this.props.symbol.toLowerCase()
    ) {
      console.log(`Stock Facts updates ${this.props.symbol}`);
      console.log(this.state.dataFetched);
      if (!this.state.dataFetched) {
        if (this.props.symbol) {
          getCompleteData(this.props.symbol, "", ["quote"])
            .then(res => {
              console.log("Got Quote data");
              if (res && "quote" in res) {
                let facts = res["quote"];
                console.log(facts);

                this.setState({
                  symbol: facts["symbol"],
                  name: facts["companyName"],
                  change: facts["change"],
                  changePercent: facts["changePercent"] + "%",
                  price: "USD " + facts["latestPrice"],
                  error: null
                });
              } else {
                this.setState({
                  error: "No Company found with symbol " + this.props.symbol
                });
              }
            })

            .catch(err => {
              this.setState({
                ...this.defaultState,
                error:
                  "No Company found with symbol " +
                  this.props.symbol.toUpperCase()
              });
            });

          // getSymbolFacts(this.props.symbol)
          //   .then(res => res.json())
          //   .then(res => {
          //     console.log(res);
          //     let stockData = res["Global Quote"];
          //     console.log(stockData);
          //     this.setState({
          //       symbol: stockData["01. symbol"],
          //       price: "USD " + stockData["05. price"],
          //       change: stockData["09. change"],
          //       changePercent: stockData["10. change percent"]
          //     });
          //   });
          // getSearchResults(this.props.symbol)
          //   .then(res => res.json())
          //   .then(res => {
          //     console.log("Getting name");
          //     console.log(res);
          //     let name = res["bestMatches"][0]["2. name"];
          //     console.log(`The name is ${name}`);
          //     this.setState({
          //       name: name
          //     });
          //   });
        }
      }
    }
  }

  render() {
    return (
      <StockFactsContainer>
        {this.state.error && (
          <div class="stock-facts__error">{this.state.error}</div>
        )}
        <div class="stock-facts__symbol">{this.state.symbol}</div>
        <div class="stock-facts__name">{this.state.name}</div>
        <div class="stock-facts__price">{this.state.price}</div>
        {this.state.change && (
          <div
            class="stock-facts__change"
            style={{ color: this.state.change > 0 ? "green" : "red" }}
          >
            {this.state.change > 0 ? (
              <FiChevronsUp color="green" />
            ) : (
              <FiChevronsDown color="red" />
            )}
            <span>{this.state.changePercent}</span>
          </div>
        )}
      </StockFactsContainer>
    );
  }
}
