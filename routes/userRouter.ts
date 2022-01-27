import { Router } from "express";
import { getUsers, getUser, addUser, editUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);
router.get('/user/:id', getUser);
router.put('/user/:id', editUser)
router.delete('/user', deleteUser);

export default router;