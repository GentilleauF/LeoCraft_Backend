const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
 const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3001"
};

app
  .use(cors(corsOptions))
  .use(morgan("dev"))
  .use(bodyParser.json());


  sequelize.initDb();


// app.use(({res}) => {
//     const message = "Impossible d'afficher la ressource demandée"
//     res.status(404).json({message})
// })

//require("./src/routes/craft.routes")(app)
require("./src/routes/user.routes")(app)
app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));
