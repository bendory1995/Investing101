import axios from "axios";

import {
  CREATE_WATCHLIST,
  UPDATE_WATCHLIST,
  DELETE_WATCHLIST,
  GET_WATCHLIST,
  WATCHLIST_LOADING,
  GET_WATCHLISTS,
  WATCHLISTS_LOADING
} from "./types";

// Create Watchlist
export const createWatchlist = watchlistData => dispatch => {
  axios
    .post("/api/watchlists/create", watchlistData)
    .then(res =>
      dispatch({
        type: CREATE_WATCHLIST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Update Watchlist
export const updateWatchlist = watchlistData => dispatch => {
  axios
    .patch("/api/watchlists/update", watchlistData)
    .then(res =>
      dispatch({
        type: UPDATE_WATCHLIST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete Watchlist
export const deleteWatchlist = id => dispatch => {
  axios
    .delete(`/api/watchlists/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_WATCHLIST,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Get specific watchlist by id
export const getWatchlist = id => dispatch => {
  dispatch(setWatchlistLoading());
  axios
    .get(`/api/watchlists/${id}`)
    .then(res =>
      dispatch({
        type: GET_WATCHLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WATCHLIST,
        payload: null
      })
    );
};

// Get all watchlists for specific user
export const getWatchlists = () => dispatch => {
  dispatch(setWatchlistsLoading());
  axios
    .get("/api/watchlists")
    .then(res =>
      dispatch({
        type: GET_WATCHLISTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WATCHLISTS,
        payload: null
      })
    );
};

// Watchlist loading
export const setWatchlistLoading = () => {
  return {
    type: WATCHLIST_LOADING
  };
};

// Watchlists loading
export const setWatchlistsLoading = () => {
  return {
    type: WATCHLISTS_LOADING
  };
};
