import express from 'express';
import { addCategory, getAllCategories, updateCategoryById, deleteCategoryById } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/ADD_CATEGORY', authMiddleware, addCategory);  
router.post('/GET_ALL_CATEGORIES', authMiddleware, getAllCategories);  
router.post('/UPDATE_CATEGORY_BY_ID/:categoryId', authMiddleware, updateCategoryById);  
router.post('/DELETE_CATEGORY_BY_ID/:categoryId', authMiddleware, deleteCategoryById);  

export default router;
