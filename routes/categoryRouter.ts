import { Router } from "express";
import { getCategories, getCategory, addCategory, deleteCategory, editCategory } from "../controllers/categoryController";

const router = Router();

router.get('/', getCategories);
router.post('/', addCategory);
router.get('/category/:id', getCategory);
router.put('/category/:id', editCategory);
router.delete('/category/:id', deleteCategory)

export default router;