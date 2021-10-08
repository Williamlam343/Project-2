const User = require('./User');
const Watchlist = require('./Watchlist');
const Favorite = require("./Favorite")

User.hasMany(Watchlist, {
  foreignKey: 'user_id',
});

Watchlist.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Favorite, {
  foreignKey: "user_id"
})

Favorite.belongsTo(User, {
  foreignKey: "user_id"
})

module.exports = { User, Watchlist, Favorite };