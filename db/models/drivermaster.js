'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DRIVERMASTER extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DRIVERMASTER.hasOne(models.DRIVERFAMILYHISTORY, { foreignKey: 'driver_id' });
      DRIVERMASTER.hasOne(models.DRIVERMASTERPERSONAL, { foreignKey: 'driver_id' });
    }
  }
  DRIVERMASTER.init({
    driver_cetid: DataTypes.INTEGER,
    driver_cetName: DataTypes.STRING,
    external_id: {
      type: DataTypes.STRING
    },
    createdBy: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    healthCardNumber: {
      type: DataTypes.STRING
    },
    driverId: {
      type: DataTypes.INTEGER
    },
    abhaNumber: {
      type: DataTypes.STRING
    },
    dateOfBirthOrAge: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other')
    },
    photographOfDriver: {
      type: DataTypes.STRING
    },
    localAddress: {
      type: DataTypes.STRING
    },
    localAddressDistrict: {
      type: DataTypes.STRING
    },
    localAddressState: {
      type: DataTypes.STRING
    },
    contactNumber: {
      type: DataTypes.STRING,
      // unique: true, // Ensure the contactNumber is unique
      // allowNull: true
    },
    emergencyContactName: {
      type: DataTypes.STRING
    },
    emergencyContactNumber: {
      type: DataTypes.STRING
    },
    idProof_name: {
      type: DataTypes.STRING
    },
    idProof: {
      type: DataTypes.STRING
    },
    idProof_number: {
      type: DataTypes.STRING
    },
    idProof_doc: {
      type: DataTypes.STRING
    },
    blood_group: {
      type: DataTypes.STRING
    },
    //

  }, {
    sequelize,
    modelName: 'DRIVERMASTER',
  });
  return DRIVERMASTER;
};