'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CETMANAGEMENT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CETMANAGEMENT.init({
    external_id: DataTypes.STRING,
    cet_type: DataTypes.STRING,

    name: DataTypes.STRING,
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registeredAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correspondenceAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spocName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spocWhatsappNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spocEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alternateSpocName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alternateSpocContactNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alternateSpocEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attachPanCopy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gstin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attachGstin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ifscCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Pending',
        'In_Progress'),
      allowNull: false,
      defaultValue: 'In_Progress'
    },
    attachCancelledChequeOrPassbook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attachCertificateOfIncorporation: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'CETMANAGEMENT',
  });
  return CETMANAGEMENT;
};