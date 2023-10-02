const User = require('./user');
const Profile = require('./Profile')
const sequelize = require('../config/connection.js');


User.hasOne(Profile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'user_id'
});



module.exports = { User, Profile};
