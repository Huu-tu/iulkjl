const mongoose = require('mongoose');

const courseCategory = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
  creationTime: Number
})

module.exports = mongoose.model("courseCategory",courseCategory);