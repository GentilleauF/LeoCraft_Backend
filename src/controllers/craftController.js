const db = require("../db/sequelize");
const Craft = db.Craft;
// CREATE a craft
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Le titre ne peut etre vide can not be empty!" });
    return;
  }
  const craft = {
    title: req.body.title,
    creationDate: req.body.creationDate,
    price: req.body.price,
    image: req.body.image,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    technique: req.body.technique,
    signature: req.body.signature,
    isAvailable: req.body.isAvailable ? req.body.isAvailable : false
  };
  // Save Tutorial in the database
  Craft.create(craft)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
        console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Craft.",
      });
    });
};

//Find one Craft
exports.findOne = (req, res) => {
  const id = req.params.id;

  Craft.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Il n'y a pas de tableau avec l'id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Problème lors de la recherche du tableau id= " + id,
      });
    });
};

// Retrieve ALL crafts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Craft.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur c'est passée, veuillez ressayer.",
      });
    });
};


// Update a Craft by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Craft.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Craft was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Craft with id=${id}. Maybe Craft was not found or request.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Craft with id=" + id
        });
      });
  };



  // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Craft.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Craft was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Craft with id=${id}. Maybe Craft was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Craft with id=" + id
        });
      });
  };