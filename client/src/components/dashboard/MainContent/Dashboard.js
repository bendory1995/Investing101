import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  render() {
    const { watchlists } = this.props.watchlists;

    let content;

    let watchlistData = watchlists.sort().map(watchlist => (
      <div
        key={watchlist._id}
        className="watchlist-icon"
        onClick={() => this.props.history.push(`/watchlists/${watchlist._id}`)}
      >
        <div className="watchlist-name">{watchlist.name}</div>
        <div
          className="watchlist-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            watchlist.name,
            watchlist.teamMembers,
            watchlist._id,
            watchlist.owner
          )}
        >
          Edit watchlist
        </div>
        <div className="watchlist-info-button">Go to watchlist</div>
      </div>
    ));

    if (watchlists.length > 0) {
      // At least one watchlist
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Create another watchlist
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="watchlists-wrapper">{watchlistData}</div>
        </>
      );
    } else {
      // No watchlists
      content = (
        <>
          <div className="watchlists">
            <div className="no-watchlists">
              <h1 className="header">You have no watchlists</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first watchlist
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your Watchlists</h1>
        {content}
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
)(Dashboard);
