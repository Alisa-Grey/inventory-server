'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Employees', { 
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                references: {
                    model: 'Inventories',
                    key: 'ownerId'
                }
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
            },
        });

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Employees');
    }
};
