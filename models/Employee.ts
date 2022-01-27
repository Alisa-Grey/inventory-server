import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize = require("sequelize");

interface IEmployeeAttributes {
    id: number;
    name: string;
    lastName: string;
    status: string;
    email: string;
    phone: string;
    img: string;
  }

module.exports = (sequelize: any, DataTypes: any) => {
    class Employee extends Model<IEmployeeAttributes> implements IEmployeeAttributes {
        id: number;
        name!: string;
        lastName!: string;
        status: string;
        email!: string;
        phone: string;
        img: string;

        static associate(models: any) {
            Employee.hasMany(models.Inventory, {
                as: 'inventory',
                foreignKey: 'ownerId'
            });
            Employee.hasOne(models.InventorySetup, {
                as: 'setup',
                foreignKey: 'ownerId'
            })
        }
    } 
    
    Employee.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(20),
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING,
            },
            img: {
                type: DataTypes.STRING
            },
        },
        {
            sequelize, 
            modelName: "Employee",
          }
    );
    return Employee
}
