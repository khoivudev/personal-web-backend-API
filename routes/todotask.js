var express = require('express');
var router = express.Router();
var TodoTask = require("../models/TodoTask");

//POST METHOD
router.post('/', async(req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/todotask");
        console.log("success");
    } catch (err) {
        res.redirect("/todotask");
        console.log("error");
    }
});

// GET METHOD
router.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render('pages/todotask/todotask', { title: 'todolist', todoTasks: tasks });
    });
});

//UPDATE
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("pages/todotask/todoEdit", { title: 'todolist', todoTasks: tasks, idTask: id });
    });
})

router.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/todotask");
    });
});

//DELETE
router.get("/remove/:id", (req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/todotask");
    });
});

module.exports = router;