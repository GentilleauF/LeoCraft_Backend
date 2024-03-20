module.exports = (app) => {
    const user = require("../controllers/userController");
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", user.createUser);

    //LOGIN
    router.post("/login", user.loginUser )
  
    // // get ALL users
    // router.get("/", user.findAll);
  
    // // Retrieve a single user with id
    // router.get("/:id", user.findOne);
  
    // // Delete a user with id
    // router.delete("/:id", user.delete);
  
    // // Update a user with id
    // router.put("/:id", user.update);
  
    app.use("/api/user", router);
  };
  