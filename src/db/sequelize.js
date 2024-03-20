const { Sequelize, DataTypes } = require('sequelize');
const CraftModel = require('../models/craftModel');
const UserModel = require('../models/userModel');
const crafts = require('./dataFixtureCrafts');
const bcrypt = require('bcrypt');


//Connect to the DB
const sequelize = new Sequelize('leocraft', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

  //Auth to the DB to test the connection
  sequelize.authenticate()
  .then(_ => console.log('La connexion à la BDD a bien été établie'))
  .catch(error => console.log(`Connexion à la BDD impossible : ${error}`))



  //Initialize the Database to put data
  const Craft = CraftModel(sequelize, DataTypes);
  const User = UserModel(sequelize, DataTypes);


  const initDb = () => {
    return sequelize.sync({force : true}).then(_ => {
      crafts.map(craft => {
        Craft.create({
          title: craft.title,
          creationDate: craft.creation_date,
          price: craft.price,
          image: craft.image,
          shortDescription: craft.shortDescription,
          description: craft.description,
          technique: craft.technique,
          signature: craft.signature,
          isAvailable: craft.isAvailable
        })
      }),

      bcrypt.hash('azerty', 10)
      .then(hash => {
          User.create({
        email : "admin@gmail.com",
        password : hash
      })
      })
    
      
      console.log('La base de donnée a bien été initialisée !')
    })
  }

  module.exports = {
    initDb, Craft, User
  }