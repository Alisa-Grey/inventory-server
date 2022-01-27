import { Router } from "express";
import { addRoom, getRoom, getRooms, editRoom } from '../controllers/roomController';

export const router = Router();

router.post('/', addRoom);
router.get('/', getRooms);
router.get('/room/:id', getRoom);
router.put('/room/:id', editRoom);

export default router;