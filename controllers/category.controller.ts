import { Request, Response } from 'express';
import Category from '../models/category.model';


export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user_id = req.userId; 

  try {
    const existingCategory = await Category.findOne({ name, user_id });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists for this user' });
    }

    const newCategory = new Category({
      name,
      user_id
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Error creating category' });
  }
};


export const getAllCategories = async (req: Request, res: Response) => {
  const user_id = req.userId;

  try {
    const categories = await Category.find({ user_id }).populate('user_id');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};


export const updateCategoryById = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const user_id = req.userId;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId, user_id },
      { name, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Error updating category' });
  }
};


export const deleteCategoryById = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const user_id = req.userId;

  try {
    const deletedCategory = await Category.findOneAndDelete({ _id: categoryId, user_id });

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
