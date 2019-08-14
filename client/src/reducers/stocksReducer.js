import {
  CREATE_STOCK,
  // UPDATE_STOCK,
  // DELETE_STOCK,
  GET_STOCKS,
  STOCKS_LOADING
} from "../actions/types";

const initialState = {
  stocks: [],
  stocksLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_STOCK:
      return {
        ...state,
        stocks: [action.payload, ...state.stocks]
      };
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload,
        stocksLoading: false
      };
    case STOCKS_LOADING:
      return {
        ...state,
        stocksLoading: true
      };
    default:
      return state;
  }
}
