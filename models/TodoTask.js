var mongoose = require("mongoose");

var TodoTaskSchema = mongoose.Schema({
    userid: {
        type: String,
        default: 1
    },
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