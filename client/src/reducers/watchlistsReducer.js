import {
  CREATE_WATCHLIST,
  UPDATE_WATCHLIST,
  DELETE_WATCHLIST,
  GET_WATCHLIST,
  WATCHLIST_LOADING,
  GET_WATCHLISTS,
  WATCHLISTS_LOADING
} from "../actions/types";

const initialState = {
  watchlists: [],
  watchlist: [],
  watchlistLoading: false,
  watchlistsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_WATCHLIST:
      return {
        ...state,
        watchlists: [action.payload, ...state.watchlists]
      };
    case UPDATE_WATCHLIST:
      let index = state.watchlists.findIndex(
        watchlist => watchlist._id === action.payload._id
      );

      state.watchlists.splice(index, 1);

      return {
        ...state,
        watchlists: [action.payload, ...state.watchlists]
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
        watchlists: state.watchlists.filter(
          watchlist => watchlist._id !== action.payload
        )
      };
    case GET_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload,
        watchlistLoading: false
      };
    case GET_WATCHLISTS:
      return {
        ...state,
        watchlists: action.payload,
        watchlistsLoading: false
      };
    case WATCHLIST_LOADING:
      return {
        ...state,
        watchlistLoading: true
      };
    case WATCHLISTS_LOADING:
      return {
        ...state,
        watchlistsLoading: true
      };
    default:
      return state;
  }
}
