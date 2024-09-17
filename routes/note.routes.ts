import express from 'express';
import { createNote, getNotes, updateNote, deleteNote, searchNotes } from '../controllers/note.controller';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authMiddleware, createNote);     
router.post('/fetch', authMiddleware, searchNotes);     
router.post('/update/:noteId', authMiddleware, updateNote); 
router.post('/delete/:noteId', authMiddleware, deleteNote); 

export default router;
