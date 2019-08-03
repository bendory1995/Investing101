import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    stocks: []
  }
  componentDidMount() {
    this.getStocks();
  }
  getStocks = _ => {
    fetch('http://localhost:4000/stocks')
    .then(response => response.json())
    .then(response => this.setState({stocks: response.data}))
    .catch(err => console.error(err))
  }

  renderStock = ({stock_id, stock_symbol}) => <div key={stock_id}>{stock_symbol}</div>
  render(){
    const {stocks} = this.state;
    return(
      <div className = "App">
      {stocks.map(this.renderStock)}
      </div>
    );
  }
}


export default App;
