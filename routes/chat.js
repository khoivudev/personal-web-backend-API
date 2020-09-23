var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/chat/index', { title: "Room list | K-Zone" });

})


router.get('/room', (req, res) => {
    res.render('pages/chat/room', { title: "Room list | K-Zone" });

})

module.exports = router;