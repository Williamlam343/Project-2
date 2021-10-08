const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Watchlist extends Model { }

Watchlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imdbID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,

    },
    imdbRating: {
      type: DataTypes.DECIMAL(10, 1),

    },
    year: {
      type: DataTypes.INTEGER,

    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    plot: {
      type: DataTypes.STRING,

    },
    genre: {
      type: DataTypes.STRING,

    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id"
      }
    }
    // if true favorites else false watchlist  
    // list: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'Watchlist',
  }
);

module.exports = Watchlist;
