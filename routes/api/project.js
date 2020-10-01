var express = require("express");
var router = express.Router();
var Project = require("../../models/Project");

// @route GET api/project/
// @desc Get all project's items
// @access Public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects))
    .catch((err) => res.sendStatus(404).json({ success: false }));
});

//Get project by tech field

// @route POST api/project/
// @desc Create a item
// @access Public
router.post("/", (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    tech: req.body.tech,
    img_url: req.body.img_url,
    project_url: req.body.project_url,
    github_url: req.body.github_url,
  });
  newProject
    .save()
    .then((project) => res.json(project))
    .catch((err) => res.sendStatus(404).json({ success: false }));
});

// @route PUT api/Project/:id
// @desc  update a project
// @access Public
router.patch("/:id", async (req, res) => {
  try {
    var objForUpdate = {};
    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.tech) objForUpdate.tech = req.body.tech;
    if (req.body.img_url) objForUpdate.img_url = req.body.img_url;
    if (req.body.project_url) objForUpdate.project_url = req.body.project_url;
    if (req.body.github_url) objForUpdate.github_url = req.body.github_url;

    let updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { $set: objForUpdate },
      { useFindAndModify: false, new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.sendStatus(404).json({ success: false });
  }
});

// @route DELETE api/project/:id
// @desc Delete a Project
// @access Public
router.delete("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ success: true })))
    .catch((err) => res.sendStatus(404).json({ success: false }));
});

module.exports = router;
