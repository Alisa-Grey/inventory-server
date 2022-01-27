'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: 'Inventories',
          key: 'category'
        }
    },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories')
  }
};
