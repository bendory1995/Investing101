const express = require("express");
const router = express.Router();
const passport = require("passport");

const Watchlist = require("../../models/Watchlist");

// @route GET api/watchlists
// @desc Get all watchlists for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let watchlistsArr = [];

    // Member watchlists
    await Watchlist.find({})
      .then(watchlists => {
        watchlists.map(watchlist => {
          watchlist.teamMembers.map(member => {
            if (member.email == req.user.email) {
              watchlistsArr.push(watchlist);
            }
          });
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner watchlists
    await Watchlist.find({ owner: OWNER })
      .then(watchlists => {
        let finalArr = [...watchlists, ...watchlistsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/watchlists/:id
// @desc Get specific watchlist by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Watchlist.findById(id).then(watchlist => res.json(watchlist));
  }
);

// @route POST api/watchlists/create
// @desc Create a new watchlist
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_WATCHLIST = await new Watchlist({
      owner: OWNER,
      name: req.body.watchlistName,
      teamMembers: req.body.members
    });

    NEW_WATCHLIST.save().then(watchlist => res.json(watchlist));
  }
);

// @route PATCH api/watchlists/update
// @desc Update an existing watchlist
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let watchlistFields = {};

    watchlistFields.name = req.body.watchlistName;
    watchlistFields.teamMembers = req.body.members;

    Watchlist.findOneAndUpdate(
      { _id: req.body.id },
      { $set: watchlistFields },
      { new: true }
    )
      .then(watchlist => {
        res.json(watchlist);
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/watchlists/delete/:id
// @desc Delete an existing watchlist
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Watchlist.findById(req.params.id).then(watchlist => {
      watchlist.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
