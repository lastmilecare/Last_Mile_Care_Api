'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });

    }
  }
  Doctor.init({

    external_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    registration_number: DataTypes.STRING,
    qualification: DataTypes.STRING,
    signature: DataTypes.STRING,
    contact_number: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};