module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
            msg : 'Le nom est deja pris'
        }
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }