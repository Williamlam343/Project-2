const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Reviews: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'gallery',
  }
);

module.exports = Gallery;
