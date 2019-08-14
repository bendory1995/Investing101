import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Stocks extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { watchlists } = this.props.watchlists;

    return (
      <div className="main-content">
        <h1 className="header">Your Stocks</h1>
        <div className="watchlists">
          <div className="no-watchlists">
            <h1 className="header">You have no stocks</h1>
            {watchlists.length > 0 ? (
              <p>Visit a watchlist to create your first stock</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first watchlist
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watchlists: state.watchlists
});

export default connect(
  mapStateToProps,
  {}
)(Stocks);
