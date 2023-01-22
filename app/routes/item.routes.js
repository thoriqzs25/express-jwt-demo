const { verification } = require("../middlewares");
const itemController = require("../controllers/item.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/item", [verification.verifyToken], itemController.getAll);

  app.post("/item", [verification.verifyToken], itemController.insertItem);
};
