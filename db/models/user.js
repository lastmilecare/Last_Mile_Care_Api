'use strict';
const {
  Model,
  BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    role_id: DataTypes.BIGINT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};