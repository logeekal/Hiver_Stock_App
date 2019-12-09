import { contants } from "../constants";

export const URLBuilder = (base_url = contants.URL, params) => {
  let URL_suffix = "";
  for (let key in params) {
    if (URL_suffix !== "") {
      URL_suffix = URL_suffix + "&";
    }
    URL_suffix = URL_suffix + `${key}=${params[key]}`;
  }
  console.log(base_url);
  return base_url + URL_suffix;
};

export const getSymbolFacts = async symbol => {
  if (!symbol) {
    return;
  }
  console.log(`Getting symbol Facts for ${symbol}`);
  let param = {
    function: "GLOBAL_QUOTE",
    symbol: symbol,
    apikey: contants.API_KEY
  };

  let url = URLBuilder(contants.url, param);

  console.log(`Fetching for URL ${url}`);
  return await fetch(url);
};

export const getSearchResults = async symbol => {
  if (!symbol) {
    return;
  }
  console.log(`Getting Search Results for ${symbol}`);
  let param = {
    function: "SYMBOL_SEARCH",
    keywords: symbol,
    apikey: contants.API_KEY
  };

  let url = URLBuilder(contants.url, param);

  console.log(`Fetching for URL ${url}`);
  console.log(url);

  return await fetch(url).then(res => res.json());
};

const parseData = data => {
  console.log("data fbefore parsiong");
  console.log(data);
  let resultObj = [];
  for (let date in data) {
    resultObj.push({
      date: date,
      ...data[date]
    });
  }
  console.log("Data after parsing is ");
  console.log(resultObj);
  return resultObj;
};

export const getTends = async (symbol, trendType) => {
  console.log("In get Trends");
  console.log(trendType);
  if (!symbol || !trendType) {
    return;
  }

  let param = {
    function: trendType.function,
    symbol: symbol,
    apikey: contants.API_KEY
  };

  if (trendType.function.includes("INTRA")) {
    param["interval"] = "60min";
  }

  let url = URLBuilder(contants.URL, param);

  console.log(`Fetching for URL ${url}`);
  let trendResults = await fetch(url).then(res => res.json());

  if (trendResults["Error Message"]) {
    throw new Error(trendResults["Error Message"]);
  }
  console.log(trendResults);
  return parseData(trendResults[trendType.key]);
};

export const getCompleteData = async (symbol, range, types) => {
  let params = {
    types: types.join(","),
    token: contants.IEX_API_KEY
  };

  if (range !== "") {
    params["range"] = range;
  }

  let url = URLBuilder(contants.IEX_FULL_URL(symbol), params);

  console.log(`Fetching for URL ${url}`);
  let completeResults = await fetch(url).then(res => res.json());

  return completeResults;
};
