import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import watchlistsReducer from "./watchlistsReducer";
import stocksReducer from "./stocksReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  watchlists: watchlistsReducer,
  stocks: stocksReducer
});
