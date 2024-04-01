'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CETMANAGEMENTs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      uniqueId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      registeredAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correspondenceAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spocName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spocWhatsappNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spocEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alternateSpocName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      alternateSpocContactNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      alternateSpocEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attachPanCopy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gstin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attachGstin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ifscCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Pending',
          'In_Progress'),
        allowNull: false,
        defaultValue: 'In_Progress'
      },
      attachCancelledChequeOrPassbook: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attachCertificateOfIncorporation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CETMANAGEMENTs');
  }
};