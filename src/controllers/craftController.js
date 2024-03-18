const db = require("../db/sequelize")
const Tutorial = db.Craft


exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Il n'y a pas de tableau avec l'id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Problème lors de la recherche du tableau id= " + id
        });
      });
  };


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
   // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Tutorial.findAll({ })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur c'est passée, veuillez ressayer."
        });
      });
  };