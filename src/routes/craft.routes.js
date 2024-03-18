module.exports = (app) => {
  const craft = require("../controllers/craftController");
  var router = require("express").Router();

  // Create a new craft
  router.post("/", craft.create);

  // Retrieve all Crafts
  router.get("/", craft.findAll);

  // Retrieve a single craft with id
  router.get("/:id", craft.findOne);

  // Delete a Tutorial with id
  router.delete("/:id", craft.delete);

  // Update a Craft with id
  router.put("/:id", craft.update);

  app.use("/api/craft", router);
};
