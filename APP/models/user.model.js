const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }],
  fullName: String,
  gender: String,
  toiecScore: Number,
  address:String,
  term: Number
});

module.exports = mongoose.model("User", User);