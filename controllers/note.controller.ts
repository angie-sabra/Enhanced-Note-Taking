import { Request, Response } from 'express';
import Note from '../models/note.model';
import { ParsedQs } from 'qs';

// Create a new note
export const createNote = async (req: Request, res: Response) => {
  const { title, content, category_id } = req.body;
  const user_id = req.userId; // Retrieved from auth middleware
  
  try {
    const newNote = new Note({
      title,
      content,
      category_id,
      user_id
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: 'Error creating note' });
  }
};

// Get all notes for a user
export const getNotes = async (req: Request, res: Response) => {
  const user_id = req.userId;
  try {
    const notes = await Note.find({ user_id }).populate('category_id');
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { title, content, category_id } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(noteId, {
      title,
      content,
      category_id,
      updated_at: Date.now()
    }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Error updating note' });
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;

  try {
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting note' });
  }
};


// Advanced search, filter, and pagination for notes
export const searchNotes = async (req: Request, res: Response) => {
  const user_id = req.userId;
  const { title, content, category_id, dateFrom, dateTo, sortBy = 'created_at', sortOrder = 'desc', page = '1', limit = '10' } = req.query;

  // Build search criteria
  const searchCriteria: any = { user_id };

  // Add search filters
  if (title) {
    searchCriteria.title = { $regex: title as string, $options: 'i' }; // Case-insensitive search
  }

  if (content) {
    searchCriteria.content = { $regex: content as string, $options: 'i' }; // Case-insensitive search on content
  }

  if (category_id) {
    searchCriteria.category_id = category_id as string; // Filter by category
  }

  // Date range filter (created_at field)
  if (dateFrom || dateTo) {
    searchCriteria.created_at = {};
    if (dateFrom) {
      // Convert dateFrom string to Date object
      searchCriteria.created_at.$gte = new Date(dateFrom as string); // Filter for notes created after or on this date
    }
    if (dateTo) {
      // Convert dateTo string to Date object
      searchCriteria.created_at.$lte = new Date(dateTo as string); // Filter for notes created before or on this date
    }
  }

  // Define sorting order (default is by creation date descending)
  const sortCriteria: any = {};
  sortCriteria[sortBy as string] = (sortOrder === 'asc' ? 1 : -1); // Ascending or descending sort

  try {
    // Convert page and limit to numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Calculate how many documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Perform search, filtering, sorting, and pagination
    const notes = await Note.find(searchCriteria)
      .sort(sortCriteria)
      .skip(skip)         // Pagination: skip documents
      .limit(limitNumber) // Pagination: limit documents
      .populate('category_id');

    // Get total count for pagination
    const total = await Note.countDocuments(searchCriteria);

    res.status(200).json({
      notes,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalNotes: total
    });
  } catch (err) {
    res.status(500).json({ error: 'Error searching notes' });
  }
};




















// Search and filter notes
// export const searchNotes = async (req: Request, res: Response) => {
//   const user_id = req.userId;
//   const { title, category_id } = req.query;

//   const searchCriteria: any = { user_id };

//   if (title) {
//     searchCriteria.title = { $regex: title, $options: 'i' }; // Case-insensitive search
//   }
  
//   if (category_id) {
//     searchCriteria.category_id = category_id;
//   }

//   try {
//     const notes = await Note.find(searchCriteria).populate('category_id');
//     res.status(200).json(notes);
//   } catch (err) {
//     res.status(500).json({ error: 'Error searching notes' });
//   }
// };
