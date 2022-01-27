'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Rooms', { 
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                foreignKey: true,
                references: {
                    model: 'Inventoris',
                    key: 'roomName'
                }
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Rooms');
    }
};
