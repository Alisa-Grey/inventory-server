'use strict';

module.exports= {
 up: async(queryInterface, Sequelize) => {
  await queryInterface.createTable('Inventories', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING(150),
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'name'
      }
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    qrId: {
      type: DataTypes.STRING(50)
    },
    ownerId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'Employees',
        key: 'ownerId'
    }
    },
    roomName: {
      type: Sequelize.STRING(150),
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'name'
    }
    },
    setupId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'InventorySetups',
        key: 'id' }
    },
    img: {
      type: Sequelize.STRING,
    },
    attachments: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  });
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Inventories');
  }
}}

