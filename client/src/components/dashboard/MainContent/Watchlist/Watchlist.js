import React, { Component } from "react";
import { connect } from "react-redux";
import { getWatchlist } from "../../../../actions/watchlistsActions";
import { getStocks } from "../../../../actions/stockActions";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Watchlist.scss";

class Watchlist extends Component {
  state = {
    modal: false,
    edit: false,
    editStock: false,
    stock: false,
    name: "",
    members: [],
    id: "",
    owner: {},
    stocks: [],
    date: ""
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false, stock: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  toggleStockModal = e => {
    this.setState({
      modal: !this.state.modal,
      stock: !this.state.stock
    });
  };

  toggleEditStockModal = e => {
    this.setState({
      modal: !this.state.modal,
      editStock: !this.state.editStock
    });
  };

  componentDidMount() {
    this.props.getWatchlist(this.props.match.params.watchlist);
    this.props.getStocks(this.props.match.params.watchlist);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.watchlist !== prevProps.match.params.watchlist) {
      this.props.getWatchlist(this.props.match.params.watchlist);
      this.props.getStocks(this.props.match.params.watchlist);
    }
  }

  onChange = async e => {
    await this.setState({ stocks: this.props.stocks.stocks });

    let stocks = await [...this.state.stocks];

    await alert(stocks[e.target.id].stockName);

    stocks[e.target.id].stockName = await e.target.value;

    await this.setState({ stocks });
  };

  render() {
    const { stocks } = this.props.stocks;

    let stocksList = stocks.map((stock, index) => (
      <div className="stock-input" key={index}>
        <i className="material-icons" onClick={() => console.log("stock")}>
          check_circle
        </i>
        <input
          type="text"
          name="stock"
          id={index}
          value={stock.stockName}
          onChange={this.onChange}
          className="watchlist-stock"
        />
      </div>
    ));

    if (
      this.props.watchlist &&
      this.props.watchlist.teamMembers &&
      !this.props.watchlists.watchlistLoading &&
      !this.props.stocks.stocksLoading
    ) {
      const { watchlist } = this.props;

      return (
        <div className="main-content">
          <h1 className="watchlist-header">{watchlist.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              watchlist.name,
              watchlist.teamMembers,
              watchlist._id,
              watchlist.owner
            )}
            className="main-btn center-btn"
          >
            Edit Watchlist Info
          </button>

          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              stock={this.state.stock}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="stocks-container">
            <div className="watchlists-first-row">
              <button
                className="main-btn add-btn"
                onClick={this.toggleStockModal}
              >
                Add stock
              </button>
            </div>
            <div className="watchlist-stocks">{stocksList}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="watchlist-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  watchlist: state.watchlists.watchlist,
  watchlists: state.watchlists,
  stocks: state.stocks
});

export default connect(
  mapStateToProps,
  { getWatchlist, getStocks }
)(Watchlist);
