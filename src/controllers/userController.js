const db = require("../db/sequelize");
const User = db.User;


exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({ message: "L'email ne peut etre vide, can not be empty!" });
      return;
    }
    const user = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      firstname: req.body.firstname,

    };
    // Save User in the database
    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
          console.log(err);
        res.status(500).send({
          message:
            err.message || "Une erreur c'est insérée lors de la créatyion de l'user",
        });
      });
  };