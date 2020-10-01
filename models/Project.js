var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tech: {
    type: Array,
    required: false,
  },
  img_url: {
    type: String,
    required: true,
  },
  project_url: {
    type: String,
    required: false,
  },
  github_url: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
