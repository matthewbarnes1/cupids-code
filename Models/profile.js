const { Model, DataTypes } = require('sequelize');

class UserProfile extends Model {}

UserProfile.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female', 'Other'],
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profile',
    timestamps: false 
  }
);

module.exports = UserProfile;
