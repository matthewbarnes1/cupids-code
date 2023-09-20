class UserProfile extends Model {}

UserProfile.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  sex: {
    type: DataTypes.ENUM('Male', 'Female', 'Other')
  },
  bio: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'userProfile'
});
