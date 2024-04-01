'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DRIVERMASTERs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      healthCardNumber: {
        type: Sequelize.STRING
      },
      driverId: {
        type: Sequelize.STRING
      },
      abhaNumber: {
        type: Sequelize.STRING
      },
      dateOfBirthOrAge: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other')
      },
      photographOfDriver: {
        type: Sequelize.STRING
      },
      localAddress: {
        type: Sequelize.STRING
      },
      localAddressDistrict: {
        type: Sequelize.STRING
      },
      localAddressState: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      emergencyContactName: {
        type: Sequelize.STRING
      },
      emergencyContactNumber: {
        type: Sequelize.STRING
      },
      idProof: {
        type: Sequelize.ENUM('voterid', 'drivingLicense', 'aadhar')
      },
      idProof_number: {
        type: Sequelize.STRING
      },
      idProof_doc: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('DRIVERMASTERs');
  }
};