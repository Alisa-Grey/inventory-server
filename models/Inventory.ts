import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize = require("sequelize");

interface IInventoryAttributes {
    id: number;
    name: string;
    category: string;
    status: string;
    price: number;
    qrId: string;
    ownerId: number | null;
    roomName: string;
    setupId: number;
    img: string[];
    attachments: string[];
    comments: string[];
  }

module.exports = (sequelize: any, DataTypes: any) => {
    class Inventory extends Model<IInventoryAttributes> implements IInventoryAttributes {
        id: number;
        name!: string;
        category!: string;
        status!: string;
        price!: number;
        qrId: string;
        ownerId: number | null;
        roomName!: string;
        setupId: number;
        img: string[];
        attachments: string[];
        comments: string[];

        static associate(models: any) {
          Inventory.belongsTo(models.Employee, {
            as: 'inventory',
            foreignKey: 'ownerId'
          });
          Inventory.belongsTo(models.Room, {
            as: 'inventories',
            foreignKey: 'roomName',
            targetKey: 'name',
            
          });
          Inventory.belongsTo(models.InventorySetup, {
            as: 'items',
            foreignKey: 'setupId'
          });
          Inventory.hasMany(models.Defect, {
            as: "defects",
            foreignKey: 'itemId'
          });
          Inventory.belongsTo(models.Category, {
            as: 'categoryItems',
            foreignKey: 'category',
            targetKey: 'name'
          });
        }
    } 
    
Inventory.init ({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      qrId: {
        type: DataTypes.STRING(50)
      },
      ownerId: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      roomName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: 'storage'
      },
      setupId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      img: {
        type: DataTypes.JSON,
      },
      attachments: {
        type: DataTypes.JSON,
      },
      comments: {
        type: DataTypes.JSON,
      }
    }, {
      sequelize, 
      modelName: "Inventory",
    })
  return Inventory
  }
