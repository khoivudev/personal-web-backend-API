var express = require('express');
var router = express.Router();
var TodoTask = require("../models/TodoTask");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Homepage' });
});

router.get('/todolist', function(req, res, next) {
    res.render('pages/todolist', { title: 'todolist' });
})

module.exports = router;