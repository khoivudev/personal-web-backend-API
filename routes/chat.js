var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('pages/chat/index', { title: "Room list | K-Zone" });

})


router.get('/room', ensureAuthenticated, (req, res) => {
    res.render('pages/chat/room', { title: "Room list | K-Zone" });
})

module.exports = router;