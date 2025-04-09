const Book = require('../models/bookModel');

// Get all books (for logged-in user)
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user.id });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body, createdBy: req.user.id });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllBooks, createBook, updateBook, deleteBook };
