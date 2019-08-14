const express = require("express");
const router = express.Router();
const passport = require("passport");

const Stock = require("../../models/Stock");

// @route GET api/stocks/:id
// @desc Get stocks for specific watchlist
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Stock.find({ watchlist: id }).then(stocks => res.json(stocks));
  }
);

// @route POST api/stocks/create
// @desc Create a new stock
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const NEW_STOCK = new Stock({
      watchlist: req.body.watchlist,
      stockName: req.body.stockName
    });

    NEW_STOCK.save()
      .then(stock => res.json(stock))
      .catch(err => console.log(err));
  }
);

module.exports = router;
