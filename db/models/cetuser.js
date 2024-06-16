'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cetuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Cetuser.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Cetuser.belongsTo(models.CETMANAGEMENT, { foreignKey: 'cet_id', as: 'cetManagement' });  // Changed alias to 'cetManagement'
    }
  }
  Cetuser.init({
    user_id: DataTypes.INTEGER,
    cet_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cetuser',
  });
  return Cetuser;
};