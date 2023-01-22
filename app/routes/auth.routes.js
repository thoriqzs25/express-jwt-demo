const { verification } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/auth/signup",
    [verification.checkDuplicateUsernameOrEmail],
    authController.signup
  );

  app.post("/auth/login", authController.login);
  app.post("/auth/logout", authController.logout);

  app.get("/auth/credentials", authController.credentials);
};
