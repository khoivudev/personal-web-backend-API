var mongoose = require("mongoose");

var TodoTaskSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TodoTask', TodoTaskSchema);