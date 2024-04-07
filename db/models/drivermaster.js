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
      // define association here
    }
  }
  DRIVERMASTER.init({
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
      type: DataTypes.DATE
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
      type: DataTypes.STRING
    },
    emergencyContactName: {
      type: DataTypes.STRING
    },
    emergencyContactNumber: {
      type: DataTypes.STRING
    },
    idProof: {
      type: DataTypes.ENUM('voterid', 'drivingLicense', 'aadhar')
    },
    idProof_number: {
      type: DataTypes.STRING
    },
    idProof_doc: {
      type: DataTypes.STRING
    },

  }, {
    sequelize,
    modelName: 'DRIVERMASTER',
  });
  return DRIVERMASTER;
};