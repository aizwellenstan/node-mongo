"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var historicalSchema = new Schema({
    timestamp: Number,
    body: String
});
module.exports = mongoose.model("Historical", historicalSchema);
