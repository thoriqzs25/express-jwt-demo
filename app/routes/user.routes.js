const userController = require("../controllers/user.controller");
const { verification } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get(
    "/api/test/user",
    [verification.verifyToken],
    userController.allAccess
  );
};
