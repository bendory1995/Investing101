import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWatchlists } from "../../actions/watchlistsActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Stocks from "./MainContent/Stocks";
import Watchlist from "./MainContent/Watchlist/Watchlist";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.getWatchlists();
  }

  render() {
    const { watchlists, watchlistsLoading } = this.props.watchlists;

    let dashboardContent;

    if (watchlists === null || watchlistsLoading) {
      dashboardContent = <Spinner />;
    } else if (watchlists.length > 0) {
      dashboardContent = (
        <>
          <SideNav watchlists={watchlists} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                watchlists={watchlists}
                component={Dashboard}
              />
              <Route
                exact
                path="/stocks"
                watchlists={watchlists}
                component={Stocks}
              />
              <Route exact path="/watchlists/:watchlist" component={Watchlist} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                watchlists={[]}
                component={Dashboard}
              />
              <Route exact path="/stocks" component={Stocks} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  watchlists: state.watchlists
});

export default withRouter(
  connect(
    mapStateToProps,
    { getWatchlists }
  )(Layout)
);
