const db = require('../models');
const User = db.user;
const Course = db.course;
const Enrollment = db.enrollment;
const bcrypt = require('bcryptjs');

exports.viewProfile = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(500).send({message: "User not found with id" + req.params.userId});
      }
      res.send(user);
    }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({message: "User not found with id" + req.params.userId});
    }

    return res.status(500).send({message: "Error retrieving note with id" + req.params.userId});
  });
};

exports.viewAllProfile = (req, res) => {
  User.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(500).send({message: err});
    });
}