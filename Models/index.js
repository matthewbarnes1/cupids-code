const User = require('./User');
const Project = require('./Project');
const Profile = require('./Profile')

// User.hasOne(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

User.hasOne(Profile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

Profile.belongsTo(User, {
  foreignKey: 'user_id'
});



module.exports = { User, Project, Profile};
