const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StockSchema = new Schema({
  watchlist: {
    type: Schema.Types.ObjectId,
    ref: "watchlists",
    required: true
  },
  stockName: {
    type: String,
    required: true
  }
});

module.exports = Stock = mongoose.model("stocks", StockSchema);
