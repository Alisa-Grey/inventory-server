import { Router } from "express";

import { getItems, getItem, addItem, editItem, deleteItem } from '../controllers/itemController';

const router = Router();

router.post('/', addItem);
router.get('/', getItems);
router.get('/item/:id', getItem);
router.put('/item/:id', editItem);
router.delete('/item/:id', deleteItem);

export default router;