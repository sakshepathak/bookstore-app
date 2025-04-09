const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');



router.post('/', protect, createBook);
router.get('/', protect, getAllBooks); 
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;

