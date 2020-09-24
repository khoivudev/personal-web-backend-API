var express = require('express');
var router = express.Router();
var Quote = require("../models/Quote");

/* GET home page. */
router.get('/', function(req, res, next) {
    //Get quote
    // Get the count of all quotes
    Quote.countDocuments().exec((err, count) => {
        // Get a random entry
        if (count != 0) {
            var random = Math.floor(Math.random() * count);
            // Again query all quotes but only fetch one offset by our random #
            Quote.findOne().skip(random).exec((err, quote) => {
                res.render('pages/index', { title: 'Home | K-Zone', quote: { content: quote.content, author: quote.author } });
            })
        } else {
            res.render('pages/index', { title: 'Home | K-Zone', quote: { content: "", author: "" } });
        }
    })

});

/*Client info */
router.get('/client-info', (req, res) => {
    res.render('pages/client_info', { title: 'My info | K-Zone' });
})

module.exports = router;