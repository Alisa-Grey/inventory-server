import { Sequelize, Model, DataTypes } from 'sequelize';

interface IRoomAttributes {
    id: number;
    name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Room extends Model<IRoomAttributes> implements IRoomAttributes {
        id: number;
        name!: string;

        static associate(models: any) {
            Room.hasMany(models.Inventory, {
                as: 'inventories',
                sourceKey: 'name',
                foreignKey: 'roomName'
            });
            Room.hasMany(models.InventorySetup, {
                as: 'setups',
                sourceKey: 'name',
                foreignKey: 'roomName'
            })
        }
    };

   Room.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Room'
    });

    return Room;
};