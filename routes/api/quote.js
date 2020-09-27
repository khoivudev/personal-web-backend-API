var express = require('express');
var router = express.Router();
var Quote = require("../../models/Quote")

// @route GET api/todotask/
// @desc Get all todotask's items
// @access Public
router.get("/", (req, res) => {
    Quote.countDocuments().exec((err, count) => {
        // Get a random entry
        if (count != 0) {
            var random = Math.floor(Math.random() * count);
            // Again query all quotes but only fetch one offset by our random #
            Quote.findOne().skip(random).exec((err, quote) => {
               res.json(quote);
            })
        } else {
            res.sendStatus(404).json({ success: false });
        }
    })
});

module.exports = router;