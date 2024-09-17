import express from 'express';
import { createNote, getNotes, updateNote, deleteNote, searchNotes } from '../controllers/note.controller';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/ADD_NOTE', authMiddleware, createNote);     
router.post('/GET_ALL_NOTES', authMiddleware, searchNotes);     
router.post('/UPDATE_NOTE_BY_ID/:noteId', authMiddleware, updateNote); 
router.post('/DELETE_NOTE_BY_ID/:noteId', authMiddleware, deleteNote); 

export default router;
