const { verification } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [verification.checkDuplicateUsernameOrEmail],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
  app.post("/api/auth/signout", authController.signout);
};
