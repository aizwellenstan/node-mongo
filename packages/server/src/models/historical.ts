const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historicalSchema = new Schema({
    timestamp: Number,
    body: String
});

module.exports = mongoose.model("Historical", historicalSchema);