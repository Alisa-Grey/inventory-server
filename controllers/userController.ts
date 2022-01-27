import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middleware/errorMiddleware';
import models from '../models';


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await models.Employee.findAll({
        attributes: {exclude: ['password']},
        include: {model: models.InventorySetup, as: 'setup'}
    });
    if(!users) {
        return next(ErrorHandler.badRequest('Users not found'))
    }
    return res.json(users);  
}

export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await models.Employee.findOne({
        where: {id},
        attributes: {exclude: ['id', 'password']},
        include: {model: models.InventorySetup, as: 'setup'}
    })
    return res.json(user)
}

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, lastName, status, email, phone, setupId } = req.body;

        const candidate = await models.Employee.findOne({where: {email}});
        if(candidate) {
            throw res.status(500).send('User with this email already exists');
        }

        const user = await models.Employee.create({ name, lastName, status, email, phone });
        await models.InventorySetup.update({ownerId: user.id}, {where: {id: setupId}});
        await models.inventory.update({ownerId: user.id}, {where: {setupId: setupId}});

        return res.json({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        })
    } catch(err) {
        next(ErrorHandler.badRequest((err as Error).message))
    }
}

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const { name, lastName, status, email, phone, setupId } = req.body;
        const user = await models.Employee.findOne({ where: {id}, include: {model: models.InventorySetup, as: 'setup'}});

        if(setupId) {
            await models.InventorySetup.update({ownerId: user.id}, {where: {id: setupId}});
            await models.inventory.update({ownerId: user.id}, {where: {setupId: setupId}});
        }

        user.update(
            { name, lastName, status, email, phone },
            { where: { id } },
        );

        return res.json({ message: 'Profile was updated' });
        } catch(err) {
            return next(ErrorHandler.internal((err as Error).message));
        }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const user = await models.Employee.findOne({where: {id}});

    if (!user) {
        return next(ErrorHandler.badRequest('User not found'));
    }

    await models.Inventory.update({ownerId: null, status: 'inactive'}, {where: {ownerId: id}});
    await models.Setup.update({ownerId: null, status: 'inactive'}, {where: {ownerId: id}});
      
    models.Employee.destroy({where: {id}})
    return res.json({'message': `${user.name} ${user.lastName} was deleted`});
}
