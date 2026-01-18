import express from 'express';
import {createBook, deleteBookById, getAllBooks, getBookById, updateBookById,} from './controller.js';

const router = express.Router();

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);

export default router;
