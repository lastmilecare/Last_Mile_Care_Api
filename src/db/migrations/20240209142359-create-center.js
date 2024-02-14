'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdBy: Sequelize.BIGINT,
      project_start_date: Sequelize.STRING,
      project_name: Sequelize.STRING,
      project_unique_id: Sequelize.STRING,
      project_district: Sequelize.STRING,
      project_state: Sequelize.STRING,
      project_address: Sequelize.STRING,
      agency_name: Sequelize.STRING,
      agency_district: Sequelize.STRING,
      agency_state: Sequelize.STRING,
      agency_spoc_name: Sequelize.STRING,
      agency_spoc_email: Sequelize.STRING,
      agency_spoc_contact_number: Sequelize.STRING,
      status: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Centers');
  }
};