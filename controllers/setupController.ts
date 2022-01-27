import { Request, Response, NextFunction } from 'express';
import qrcode from 'qrcode';
import path from 'path';
import models from '../models';
import ErrorHandler from '../middleware/errorMiddleware';

export const getSetups = async (req: Request, res: Response, next: NextFunction) => {
    const setups = await models.InventorySetup.findAll({
      include: {model: models.Inventory, as: 'items'}
  });

  if(!setups) {
      return next(ErrorHandler.badRequest('Setups not found'))
  }
  return res.json(setups);  
};

export const getSetup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const setup = await models.InventorySetup.findOne({
      where: {id},
      include: {model: models.Inventory, as: 'items'}
    });
    if(!setup) {
      return next(ErrorHandler.badRequest('Setup not found'))
    }
    return res.json(setup)
  }  catch(err) {
    return next(ErrorHandler.badRequest((err as Error).message));
  }
};

export const addSetup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, ownerId, roomName, status } = req.body;
    const newSetup = await models.InventorySetup.create({ name, ownerId, roomName, status });

    const data = {
      id: newSetup.id,
      name: newSetup.name
    }
    const qrId = `s${newSetup.id}`;
    const qrName = qrId + '.png';
    qrcode.toFile(path.resolve(__dirname, '..', 'static', qrName), JSON.stringify(data), (err) => {
        if(err) return console.log('error')
    })
    newSetup.update({qrId: qrId});

  return res.json(newSetup);

  } catch(err) {
    return next(ErrorHandler.badRequest((err as Error).message));
  }
};

export const editSetup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const { name, ownerId, roomName, status } = req.body;
    const setup = await models.InventorySetup.findOne({ where: {id} });
    setup.update(
        { name, ownerId, roomName, status },
        { where: { id } }
    );

    return res.json({ message: 'Setup was updated' });
  } catch(err) {
    return next(ErrorHandler.internal((err as Error).message));
  }
};

export const deleteSetup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const setup = await models.InventorySetup.findOne({where: {id}});
    if (!setup) {
        return next(ErrorHandler.badRequest('Setup not found'));
    }

    models.Inventory.update({setupId: null}, {where: {setupId: id}});
    models.InventorySetup.destroy({where: {id}});
    return res.json({'message': `Setup was deleted`});
  } catch(err) {
    return next(ErrorHandler.internal((err as Error).message));
  }
};