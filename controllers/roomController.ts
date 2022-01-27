import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middleware/errorMiddleware';
import models from '../models';

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    const rooms = await models.Room.findAll({
        include: { model: models.Inventory, as: 'inventories' }
    });
    if(!rooms) {
        return next(ErrorHandler.internal('No rooms found'));
    };
    return res.json(rooms);
}

export const getRoom = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const room = await models.Room.findOne({
        where: {id},
        include: [
            {model: models.Inventory, as: 'inventories'},
            {model: models.InventorySetup, as: 'setups'}
        ]
    });
    if(!room) {
        return next(ErrorHandler.badRequest('No rooms found'));
    };
    return res.json(room);
}

export const addRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const newRoom = await models.Room.findOne({where: {name}});
        if (newRoom) {
            throw res.status(500).send('Room already exists');
        }
        const room = await models.Room.create({ name });

        return res.json({
            name: room.name,
        });
        
    } catch(err) {
        next(ErrorHandler.internal((err as Error).message))
    }
}

export const editRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        const room = await models.Room.findOne({
            where: {id},
            include: {model: models.Inventory, as: 'inventories'}
        });
        const oldName = room.name;

        if(!room) {
            return next(ErrorHandler.badRequest('No rooms found'));
        };

        models.Inventory.update({roomName: name}, {where: {roomName: oldName}});
        room.update(
            { name },
            { where: { id } }
        ); 

        return res.json(room);
    } catch(err) {
        next(ErrorHandler.internal((err as Error).message));
    }
}
