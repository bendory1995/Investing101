import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createWatchlist,
  updateWatchlist,
  deleteWatchlist
} from "../../../../actions/watchlistsActions";
import { createStock } from "../../../../actions/stockActions";


import "./Modal.scss";

class Modal extends Component {
  state = {
    watchlistName: "",
    members: [{ name: "", email: "" }],
    stockName: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        watchlistName: nextProps.name,
        members: nextProps.members
      });
    }
  }

  onChange = e => {
    if (["name", "email"].includes(e.target.name)) {
      let members = [...this.state.members];
      members[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ members });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  addMember = e => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: "", email: "" }]
    }));
  };

  deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array });
  };

  createWatchlist = () => {
    let watchlist = {
      watchlistName: this.state.watchlistName,
      members: this.state.members
    };

    this.props.createWatchlist(watchlist);
    this.onClose();
  };

  updateWatchlist = async id => {
    let watchlist = {
      id: this.props.id,
      watchlistName: this.state.watchlistName,
      members: this.state.members
    };

    await this.props.updateWatchlist(watchlist);

    this.onClose();
  };

  deleteWatchlist = id => {
    this.props.deleteWatchlist(id);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      watchlistName: "",
      stockName: "",
      members: [{ name: "", email: "" }]
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  createStock = e => {
    e.preventDefault();

    const data = {
      watchlist: this.props.watchlists.watchlist._id,
      stockName: this.state.stockName
    };

    this.props.createStock(data);

    this.onClose();
  };

  render() {
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };


    // Create stock modal
    if (this.props.stock) {



      return (
        <form onSubmit={this.createStock} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create stock</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Stock Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.stockName}
                id="stockName"
                type="text"
                placeholder={"What is the stock?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              
            </div>
          </div>
          <div>
            <button className="main-btn update-watchlist" type="submit">
              Create Stock
            </button>
          </div>
        </form>
      );
    } else if (this.props.editStock) {


      return (
        <form onSubmit={this.createStock} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit stock</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Stock Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.stockName}
                id="stockName"
                type="text"
                placeholder={"What is the stock?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
            

            </div>
          </div>
          <div>
            <button className="main-btn update-watchlist" type="submit">
              Create Stock
            </button>
          </div>
        </form>
      );
    }

    // Edit watchlist modal
    else if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Watchlist Info</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">Watchlist Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.watchlistName}
                id="watchlistName"
                type="text"
                placeholder={"My Awesome Watchlist"}
                className="form-input"
              />
            </label>
          </div>


          <div>
            <button
              className="main-btn update-watchlist"
              onClick={this.updateWatchlist.bind(this, this.props.id)}
            >
              Update Watchlist
            </button>
            {this.props.owner.id === this.props.auth.user.id ? (
              <button
                className="main-btn delete-watchlist"
                onClick={this.deleteWatchlist.bind(this, this.props.id)}
              >
                Delete Watchlist
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // Create watchlist modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create a watchlist</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Watchlist Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.watchlistName}
                id="watchlistName"
                type="text"
                placeholder="My Awesome Watchlist"
                className="form-input"
              />
            </label>
          </div>


          <div>
            <button
              className="main-btn create-watchlist"
              onClick={this.createWatchlist}
            >
              Create Watchlist
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  watchlists: state.watchlists,
  stocks: state.stocks
});

export default connect(
  mapStateToProps,
  { createWatchlist, updateWatchlist, deleteWatchlist, createStock }
)(Modal);
