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


      CETMANAGEMENT.hasMany(models.Cetuser, { foreignKey: 'cet_id', as: 'Cetusers' });  // Changed alias to 'Cetusers'
      CETMANAGEMENT.belongsToMany(models.User, { through: models.Cetuser, foreignKey: 'cet_id', otherKey: 'user_id', as: 'Users' });  // Changed alias to 'Users'


    }
  }
  CETMANAGEMENT.init({
    external_id: DataTypes.STRING,
    cet_type: DataTypes.STRING,
    center_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    uniqueId: {
      type: DataTypes.STRING,

    },
    registeredAddress: {
      type: DataTypes.STRING,

    },
    correspondenceAddress: {
      type: DataTypes.STRING,

    },
    contactNumber: {
      type: DataTypes.STRING,

    },
    spocName: {
      type: DataTypes.STRING,

    },
    spocWhatsappNumber: {
      type: DataTypes.STRING,

    },
    spocEmail: {
      type: DataTypes.STRING,

    },
    alternateSpocName: {
      type: DataTypes.STRING,

    },
    alternateSpocContactNumber: {
      type: DataTypes.STRING,

    },
    alternateSpocEmail: {
      type: DataTypes.STRING,

    },
    pan: {
      type: DataTypes.STRING,

    },
    short_code: {
      type: DataTypes.STRING,

    },
    attachPanCopy: {
      type: DataTypes.STRING,

    },
    gstin: {
      type: DataTypes.STRING,

    },
    attachGstin: {
      type: DataTypes.STRING,

    },
    accountNumber: {
      type: DataTypes.STRING,

    },
    ifscCode: {
      type: DataTypes.STRING,

    },
    bankName: {
      type: DataTypes.STRING,

    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Pending',
        'In_Progress'),

      defaultValue: 'In_Progress'
    },
    attachCancelledChequeOrPassbook: {
      type: DataTypes.STRING,

    },
    attachCertificateOfIncorporation: {
      type: DataTypes.STRING,

    },
  }, {
    sequelize,
    modelName: 'CETMANAGEMENT',
  });
  return CETMANAGEMENT;
};