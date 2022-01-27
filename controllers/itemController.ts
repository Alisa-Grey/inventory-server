import * as uuid from 'uuid';
import path from 'path';
import * as fs from 'fs';
import qrcode from 'qrcode';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middleware/errorMiddleware';
import models from '../models';
import fileUpload from 'express-fileupload';


export const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const items = await models.Inventory.findAll();
    if(!items) {
        return next(ErrorHandler.internal('Inventories not found'));
    };
    return res.json(items);
}

export const getItem = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const item = await models.Inventory.findOne({where: {id}});
    if(!item) {
        return next(ErrorHandler.internal('Inventory not found'));
    };
    return res.json(item);
}

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, category, status, price, setupId, ownerId, roomName, comments, count } = req.body;
        let imgName = '';
        let items = [];
        if(req.files !== null) {
            // @ts-ignore
            const img = req.files.img as fileUpload.UploadedFile ;
            imgName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', imgName))
        };
        
        for (let i = 0; i < count; i++) {
            const newItem = await models.Inventory.create({ name, category, status, price, setupId, ownerId, roomName, comments, img: imgName });
            const data = {
                id: newItem.id,
                name: newItem.name,
                category: newItem.category
            }
            const qrId = `i${newItem.id}`;
            const qrName = qrId + '.png';
            qrcode.toFile(path.resolve(__dirname, '..', 'static', qrName), JSON.stringify(data), (err) => {
                if(err) return console.log('error')
            });
            newItem.update({qrId: qrId});
            items.push(newItem)
        }
        
        return res.json(items);
    } catch(err) {
        return next(ErrorHandler.badRequest((err as Error).message));
    }
}

export const editItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        let { name, category, status, price, setupId, ownerId, roomName, comments } = req.body;

        let imgName = '';

        if(req.files !== null) {
            // @ts-ignore
            const img = req.files.img as fileUpload.UploadedFile ;
            imgName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', imgName))
        };

        const inventory = await models.Inventory.findOne({ where: {id} });
        
        inventory.update(
            { name, category, status, price, setupId, ownerId, roomName, comments, img: imgName },
            { where: { id } }
        );

        return res.json(inventory);
        } catch(err) {
            return next(ErrorHandler.internal((err as Error).message));
        }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const item = await models.Inventory.findOne({where: {id}});
    
    if (!item) {
        return next(ErrorHandler.badRequest('Not found'));
    }
    if(item.img) {
        fs.unlink(path.resolve(__dirname, '..', 'static', item.img), function(err){
            if(err) return console.error(err);
            console.log(`${item.name} image was deleted`);
        });  
    }
    models.Inventory.destroy({where: {id}})
    return res.json({'message': `Item was deleted`})
}