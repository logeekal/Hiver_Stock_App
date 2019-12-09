export const contants = {
  URL: "https://www.alphavantage.co/query?",
  API_KEY: "WZ3KPV4QVVSCGHB3",
  IEX_API_KEY: "pk_3ad77fd90a334e86be42b18de22603c2",
  IEX_BASE_URL: "https://cloud.iexapis.com/stable",
  IEX_FULL_URL: function(symbol) {
    return `${this.IEX_BASE_URL}/stock/${symbol}/batch?`;
  }
};

export const trends = {
  TIME_SERIES_WEEKLY: {
    function: "TIME_SERIES_WEEKLY",
    key: "Weekly Time Series",
    range: "1w",
    name: "1W",
    enabled: false,
    rank: 4
  },
  TIME_SERIES_DAILY: {
    function: "TIME_SERIES_DAILY",
    key: "Time Series (Daily)",
    range: "1d",
    name: "INTRADAY",
    enabled: true,
    rank: 10
  },
  TIME_SERIES_QUATERLY: {
    function: "TIME_SERIES_QUATERLY",
    key: "Time Series (Daily)",
    range: "3m",
    name: "1Q",
    enabled: true,
    rank: 2
  },
  TIME_SERIES_INTRADAY: {
    function: "TIME_SERIES_INTRADAY",
    key: "Time Series (60min)",
    range: "1d",
    name: "INTRADAY",
    enabled: false,
    rank: 1
  },
  TIME_SERIES_MONTHLY: {
    function: "TIME_SERIES_MONTHLY",
    key: "Monthly Time Series",
    range: "1m",
    name: "1M",
    enabled: true,
    rank: 3
  },
  TIME_SERIES_YEARLY: {
    function: "TIME_SERIES_YEARLY",
    key: "Monthly Time Series",
    range: "1y",
    name: "1Y",
    enabled: true,
    rank: 1
  },
  TIME_SERIES_5YEARLY: {
    function: "TIME_SERIES_5YEARLY",
    key: "Monthly Time Series",
    range: "5y",
    name: "5Y",
    enabled: false,
    rank: 1
  }
};
