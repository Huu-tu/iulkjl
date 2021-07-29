const mongoose = require('mongoose')

const Course = new mongoose.Schema({
  name: String,
  tutor:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  creationTime: Number,
  description: String,
  // category: {
  //   type: mongoose.Schema.types.ObjectId,
  //   ref: "courseCategory"
  // }
})

module.exports = mongoose.model("Course", Course)