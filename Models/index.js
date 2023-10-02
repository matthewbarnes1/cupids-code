const Profile = require('./Profile');
const User = require('./MattUser');

User.hasOne(Profile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Profile};
