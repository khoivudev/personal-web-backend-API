var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tech: {
        type: Array,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', ProjectSchema);