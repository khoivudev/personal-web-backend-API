var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Home | K-Zone' });
});

/*Client info */
router.get('/client-info', (req, res) => {
    res.render('pages/client_info', { title: 'My info | K-Zone' });
})

module.exports = router;