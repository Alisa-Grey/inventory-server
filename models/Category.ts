import { Sequelize, Model, DataTypes } from 'sequelize';

interface ICategoryAttributes {
    id: number;
    name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Category extends Model<ICategoryAttributes> implements ICategoryAttributes {
        id!: number;
        name!: string;

        static associate(models: any) {
            Category.hasMany(models.Inventory, {
                as: '  ',
                sourceKey: 'name',
                foreignKey: 'category'
            });
        }
};

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},
{
    sequelize,
    modelName: 'Category'
});

return Category;
}; 