import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize = require("sequelize");

interface IDefectAttributes {
  id: number;
  name: string;
  itemId: number;
  desc: string;
  img: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Defect extends Model<IDefectAttributes> implements IDefectAttributes {
    id: number;
    name!: string;
    itemId!: number;
    desc!: string;
    img: string;

    static associate(models: any) {
      Defect.belongsTo(models.Inventory, {
        as: 'defects',
        foreignKey: 'itemId'
      })
    }
  };
  Defect.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Defect",
    }
  );
  return Defect;
};

// const Defects = (sequelize: any, DataTypes: any) => {
//   const Defect = sequelize.define('Defect', {
//       id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//       },
//       name: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           primaryKey: true
//       },
//       itemId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       desc: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       img: {
//         type: DataTypes.STRING,
//       },
//       updatedBy: {
//         type: DataTypes.INTEGER,
//       }
//   });
//   Defect.associate = function(models) {
//     Defect.belongsTo(models.Inventory, {
//       as: 'defects',
//       foreignKey: 'itemId'
//     });
//   }
//   return Defect;
// };
