const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    fullName: req.body.fullName,
    gender: req.body.gender,
    toiecScore: req.body.toiecScore,
    address: req.body.address,
    term: req.body.term
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: {$in: req.body.roles}
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({message: err})
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({message: err})
              return;
            }

            res.send({message: "User was registered successfully!"});
          });
        }
      );
    } else {
      Role.findOne({
          name: "admin"
        },
        (err, role) => {
          if (err) {
            res.status(500).send({message: err})
          }

          user.roles = role._id;
          user.save(err => {
            if (err) {
              res.status(500).send({message: err})
              return;
            }

            res.send({message: "User was registered successfully!"})
          });
        });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        // console.log('Error during update ' + err)
        res.status(500).send({message: err})
        return;
      }

      if (!user) {
        // console.log('User Not Found.')
        return res.status(404).send({message: "User Not Found."});
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
        // return res.json({
        //   accessToken: null,
        //   message: "Invalid Password!"
        // });
      }

      let token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      // res.json({
      //   id: user._id,
      //   username: user.username,
      //   password: user.password,
      //   email: user.email,
      //   roles: authorities,
      //   fullName: user.fullName,
      //   gender: user.gender,
      //   toiecScore: user.toiecScore,
      //   address: user.address,
      //   term: user.term,
      //   accessToken: token
      // });
      res.status(200).send({
        id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        roles: authorities,
        fullName: user.fullName,
        gender: user.gender,
        toiecScore: user.toiecScore,
        address: user.address,
        term: user.term,
        accessToken: token
      });
    })
}