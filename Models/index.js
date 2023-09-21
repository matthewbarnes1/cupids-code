const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('dating_db', 'root', 'Phrenology12!', {
  host: 'localhost',
  dialect: 'mysql'
});

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    hashed_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
);

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

User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  UserProfile
};
