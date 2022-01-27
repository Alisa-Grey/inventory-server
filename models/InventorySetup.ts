import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize = require("sequelize");

interface ISetupAttributes {
    id: number;
    name: string;
    ownerId: number;
    roomName: string;
    img: string;
    status: string;
    qrId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class InventorySetup extends Model<ISetupAttributes> implements ISetupAttributes {
        id: number;
        name!: string;
        ownerId: number;
        roomName!: string;
        img: string;
        status!: string;
        qrId: string;

        static associate(models: any) {
            InventorySetup.belongsTo(models.Room, {
                as: 'setups',
                targetKey: 'name',
                foreignKey: 'roomName'
            });
            InventorySetup.belongsTo(models.Employee, {
                as: 'setup',
                foreignKey: 'ownerId'
            });
            InventorySetup.hasMany(models.Inventory, {
                as: 'items',
                foreignKey: 'setupId'
            })
        }
    };

    InventorySetup.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            ownerId: {
                type: DataTypes.INTEGER,
            },
            roomName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            img: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            qrId: {
                type: DataTypes.STRING(50),
            }
        }, {
            sequelize,
            modelName: "InventorySetup",
        }
    );
    return InventorySetup
}