import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middleware/errorMiddleware';
import models from '../models';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await models.Category.findAll({
        include: { model: models.Inventory, as: 'categoryItems'}
    });
    if(!categories) {
        return next(ErrorHandler.internal('No categories found'));
    };
    return res.json(categories);
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const category = await models.Category.findOne({
        where: {id},
        include: [
            {model: models.Inventory, as: 'categoryItems'}
        ]
    });
    if(!category) {
        return next(ErrorHandler.badRequest('No categories found'));
    }
};

export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const newCategory = await models.Category.findOne({where: {name}});
        if (newCategory) {
            throw res.status(500).send('Category already exists');
        }
        const category = await models.Category.create({ name });

        return res.json({
            name: category.name
        });

    } catch(err) {
        return next(ErrorHandler.internal((err as Error).message));
    }
};

export const editCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await models.Category.findOne({ where: {id}, include: {model: models.Inventory, as: 'categoryItems'} });

        if(!category) {
            return next(ErrorHandler.badRequest('Category not found'));
        }

        models.Inventory.update({category: name}, {where: { category: category.name }});
        category.update({name}, {where: {id}});
        
        return res.json(category);

    } catch(err) {
        return next(ErrorHandler.internal((err as Error).message));
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await models.Category.findOne({where: {id}});
    if (!category) {
        return next(ErrorHandler.badRequest('Not found'));
    }

    models.Inventory.destroy({where: {category: category.name}});
    models.Category.destroy({where: {id}});
    return res.json({'message': `Category was deleted`});
}
