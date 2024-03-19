module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        unique: {
            msg : 'Cet email est déja pris est deja pris'
        }
      },

      password: {
        type: DataTypes.STRING
      },
      
      name: {
        type: DataTypes.STRING
      },

      firstname: {
        type: DataTypes.STRING
      }
    })
  }