const db = require("../models");
const secret = require("../config/secret.config");

const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log(req.body, "line 12");
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.send({ message: "User was registered successfully!" });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    var isValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    var token = jwt.sign({ id: user.id }, secret.secret, {
      expiresIn: 86400,
    });

    req.session.token = token;

    res.status(200).send({
      username: user.username,
      email: user.email,
      created_at: user.createdAt,
    });
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};