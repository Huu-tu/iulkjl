const mongoose = require('mongoose')

const Enrollment = new mongoose.Schema({
  trainee:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }
})

module.exports = mongoose.model("Enrollment",Enrollment);