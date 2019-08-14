import axios from "axios";

import {
  CREATE_STOCK,
  // UPDATE_STOCK,
  // DELETE_STOCK,
  GET_STOCKS,
  STOCKS_LOADING
} from "./types";

// Create Stock
export const createStock = stockData => dispatch => {
  axios
    .post("/api/stocks/create", stockData)
    .then(res =>
      dispatch({
        type: CREATE_STOCK,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Get stocks by watchlist id
export const getStocks = id => dispatch => {
  dispatch(setStocksLoading());
  axios
    .get(`/api/stocks/${id}`)
    .then(res =>
      dispatch({
        type: GET_STOCKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STOCKS,
        payload: null
      })
    );
};

// Stocks loading
export const setStocksLoading = () => {
  return {
    type: STOCKS_LOADING
  };
};
