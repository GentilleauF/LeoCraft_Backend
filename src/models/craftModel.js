const { Error } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Craft", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom de ce tableau est déja pris",
      },
      validate: {
        notEmpty: { msg: "Veuillez renseigner un nom de tableau" },
        notNull: { msg: "Le nom du tableau de ne peut être null" },
      },
    },

    creation_date:{
        type: DataTypes.DATE,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Veuillez utiliser des nombres entiers" },
        notNull: { msg: "Veuillez renseigner un prix" },
        min: {
          args: [0],
          msg: "Le prix doit être au minimum de 0",
        },
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   isUrl: { msg: "Veuillez renseigner une URL valide" },
      //   notNull: { msg: "Veuillez renseigner une URL" },
      // },
    },

    shortDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    description:  {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    technique: {
        type: DataTypes.STRING,
        allowNull: true
    },

    signature: {
        type: DataTypes.STRING,
        allowNull: true
    },

    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  }
  });
};
