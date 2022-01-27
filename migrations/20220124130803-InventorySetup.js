'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InventorySetups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id'
        }
      },
      roomName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'name'
        }
      },
      img: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      qrId: {
        type: DataTypes.STRING(50),
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('InventorySetups');
  }
};