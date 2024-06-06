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
      driverhealthcheckup.belongsTo(models.DRIVERMASTER, { foreignKey: 'driver_id', as: 'driver' });
      driverhealthcheckup.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

    }
  }
  driverhealthcheckup.init({
    createdBy: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    uniqueId: DataTypes.STRING,
    external_id: DataTypes.STRING,
    accept_term_condition: DataTypes.BOOLEAN,
    driver_id: DataTypes.INTEGER,
    package_and_test_history: DataTypes.STRING,
    driver_details: DataTypes.STRING,
    transpoter: DataTypes.INTEGER,
    driver_type: DataTypes.STRING,
    vehicle_no: DataTypes.STRING,
    signature: DataTypes.STRING,
    date_time: DataTypes.STRING,
    unique_code: DataTypes.STRING,
    spo2_unit: DataTypes.STRING,
    temperature_unit: DataTypes.STRING,
    pulse_unit: DataTypes.STRING,
    package_list: DataTypes.ARRAY(DataTypes.STRING),
    verify_option: DataTypes.STRING,
    bmi_unit: DataTypes.JSON,
    contactNumber: DataTypes.STRING,
    haemoglobin_unit: DataTypes.JSON,
    patient_type: DataTypes.STRING,
    random_blood_sugar_unit: DataTypes.JSON,
    hearing_unit: DataTypes.JSON,
    cholesterol_unit: DataTypes.JSON,
    selected_test: DataTypes.JSON,
    blood_pressure_unit: DataTypes.JSON,
    ecg_unit: DataTypes.JSON,
    doc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'driverhealthcheckup',
  });
  return driverhealthcheckup;
};