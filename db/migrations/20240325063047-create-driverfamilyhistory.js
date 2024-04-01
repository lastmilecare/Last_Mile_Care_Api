'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DRIVERFAMILYHISTORies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driver_phone: {
        type: Sequelize.STRING
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      family_member_1: {
        type: Sequelize.STRING
      },
      family_member_2: {
        type: Sequelize.STRING
      },
      parent_diabetic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      parent_hypertension: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      parent_hypotension: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      other_genetic_disease: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('DRIVERFAMILYHISTORies');
  }
};