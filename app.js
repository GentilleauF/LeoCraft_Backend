const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
 const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;


app
  .use(morgan("dev"))
  .use(bodyParser.json());


  sequelize.initDb();


// app.use(({res}) => {
//     const message = "Impossible d'afficher la ressource demandée"
//     res.status(404).json({message})
// })

app.get("/", (req, res) => res.send("Coucou"));
app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));
