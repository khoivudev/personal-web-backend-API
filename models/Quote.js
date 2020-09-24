var mongoose = require("mongoose");

var QuoteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Quote', QuoteSchema);