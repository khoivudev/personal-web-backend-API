var express = require("express");
var router = express.Router();
var TodoTask = require("../../models/TodoTask");

// @route GET api/todotask/
// @desc Get all todotask's items
// @access Public
router.get("/", (req, res) => {
  TodoTask.find()
    .sort({ date: -1 })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.sendStatus(404).json({ success: false }));
});

// @route POST api/todotask/
// @desc Create a item
// @access Public
router.post("/", (req, res) => {
  const newTask = new TodoTask({
    content: req.body.content,
  });
  newTask
    .save()
    .then((task) => res.json(task))
    .catch((err) => res.sendStatus(404).json({ success: false }));
});

// @route PUT api/todotask/:id
// @desc  update a task
// @access Public
router.patch("/:id", async (req, res) => {
  try {
    var objForUpdate = {};
    if (req.body.content) objForUpdate.content = req.body.content;
    if (req.body.completed) objForUpdate.completed = req.body.completed;

    let updatedTask = await TodoTask.findOneAndUpdate(
      { _id: req.params.id },
      { $set: objForUpdate },
      { useFindAndModify: false, new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.sendStatus(404).json({ success: false });
  }
});

// @route DELETE api/todotask/:id
// @desc Delete a task
// @access Public
router.delete("/:id", (req, res) => {
  TodoTask.findById(req.params.id)
    .then((task) => task.remove().then(() => res.json({ success: true })))
    .catch((err) => res.sendStatus(404).json({ success: false }));
});

module.exports = router;
