module.exports = (app) => {
  const craft = require("../controllers/craftController");

  var router = require("express").Router();
  // Retrieve all Crafts
  router.get("/", craft.findAll);

  // Retrieve a single craft with id
  router.get("/:id", craft.findOne);

  app.use("/api/craft", router);
};
