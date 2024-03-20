const db = require("../db/sequelize");
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const privateKey = require("../../env")


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

      // Hachage du mot de passe avec bcrypt
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      // Gestion de l'erreur de hachage
      console.error(err);
      return res.status(500).send({ message: "Erreur lors du hachage du mot de passe" });
  }

    // Remplacer le mot de passe en clair par le hash
    user.password = hash;

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
    
    })
  };



  
exports.loginUser = (req, res) => {
      console.log(req.body.email);
  
      User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            const message = "L'utilisateur demandé n'existe pas";
            return res.status(404).json({ message });
          }
          bcrypt
            .compare(req.body.password, user.password)
            .then((isPasswordValid) => {
              if (!isPasswordValid) {
                const message = `Le mot de passe est incorrect`;
                return res.status(401).json({ message });
              }
  
              //JWT
              const token = 
                jwt.sign({ userId: user.id },
                privateKey, {
                expiresIn: "24h",
              });
         
  
              const message = `L'utilisateur a été connecté avec succès`;
              return res.json({ message, data: user, token });
            });
        })
        .catch((error) => {
          const message =
            "Erreur d'authentification. veuillez ressayer plus tard";
          return res.json({ message, data: error });
        });
    };
  