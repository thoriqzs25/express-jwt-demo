const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  console.log(req.body, "line 6");
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      console.log("line 11", err, "user", user);
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      console.log("line 17 user", user);
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      console.log("line 10");
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secretConf.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

const verification = {
  checkDuplicateUsernameOrEmail,
  verifyToken,
};

module.exports = verification;
