'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driverhealthcheckup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  driverhealthcheckup.init({
    driver_id: DataTypes.INTEGER,
    package_and_test_history: DataTypes.STRING,
    driver_details: DataTypes.STRING,
    transpoter: DataTypes.STRING,
    driver_type: DataTypes.STRING,
    vehicle_no: DataTypes.STRING,
    signature: DataTypes.STRING,
    date_time: DataTypes.STRING,
    unique_code: DataTypes.STRING,
    spo2_unit: DataTypes.STRING,
    temperature_unit: DataTypes.STRING,
    pulse_unit: DataTypes.STRING,
    package_list: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'driverhealthcheckup',
  });
  return driverhealthcheckup;
};