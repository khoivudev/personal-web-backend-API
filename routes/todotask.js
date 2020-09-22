var express = require('express');
var router = express.Router();
var TodoTask = require("../models/TodoTask");
const { ensureAuthenticated } = require('../config/auth');

//POST METHOD
router.post('/', ensureAuthenticated, async(req, res) => {
    const todoTask = new TodoTask({
        userid: req.user._id,
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/todotask");
        console.log("success");
        console.log(todoTask);
    } catch (err) {
        res.redirect("/todotask");
        console.log("error");
    }
});

// GET METHOD
router.get("/", ensureAuthenticated, (req, res) => {
    TodoTask.find({ userid: req.user._id }, (err, tasks) => {
        res.render('pages/todotask/todotask', { title: 'to-do list | K-Zone', todoTasks: tasks });
    });
});

//UPDATE
router.get("/edit/:id", ensureAuthenticated, async(req, res) => {
    try {
        let task = await TodoTask.findById(req.params.id).lean()
        if (!task) {
            return res.send(404, err);
        }
        if (task.userid != req.user._id) {
            res.redirect('/todotask');
        } else {
            tasks = await TodoTask.find({ userid: req.user._id });
            res.render("pages/todotask/todoEdit", { title: 'to-do list| K-Zone', todoTasks: tasks, idTask: req.params.id });
        };
    } catch (err) {
        console.log(err);
        return res.send(404, err);
    }
})

router.post("/edit/:id", ensureAuthenticated, async(req, res) => {
    try {
        let task = await TodoTask.findById(req.params.id).lean()
        if (!task) {
            return res.send(404, err);
        }
        if (task.userid != req.user._id) {
            res.redirect('/todotask');
        } else {
            task = await TodoTask.findByIdAndUpdate({ _id: req.params.id }, { content: req.body.content });
            res.redirect("/todotask");
        };
    } catch (err) {
        console.log(err);
        return res.send(404, err);
    }
});

//DELETE
router.get("/remove/:id", ensureAuthenticated, async(req, res) => {
    try {
        let task = await TodoTask.findById(req.params.id).lean()
        if (!task) {
            return res.send(500, err);
        }
        if (task.userid != req.user._id) {
            res.redirect('/todotask');
        } else {
            await TodoTask.findByIdAndRemove(req.params.id);
            res.redirect("/todotask");
        };
    } catch (err) {
        console.log(err);
        return res.send(404, err);
    }
});

module.exports = router;