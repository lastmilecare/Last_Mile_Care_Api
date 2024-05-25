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
      User.hasMany(models.Centeruser, { foreignKey: 'user_id', as: 'centerusers' });
      User.belongsToMany(models.Center, { through: models.Centeruser, foreignKey: 'user_id', as: 'centers' });
      User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
      User.belongsTo(models.Permission, { foreignKey: 'permission_id', as: 'permission' });

    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    role_id: DataTypes.BIGINT,
    permission_id: DataTypes.BIGINT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    external_id: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};