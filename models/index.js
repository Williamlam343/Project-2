const User = require('./User');
const Movie = require('./Gallery');

User.hasMany(Movie, {
  foreignKey: 'User_id',
});

Movie.belongsTo(User, {
    foreignKey: 'User_ID'
});

module.exports = { User, Movie };