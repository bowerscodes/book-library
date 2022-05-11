const { Book } = require('../models');

exports.create = async (req, res) => {
    const newBook = Book.create(req.body);

    res.status(201).json(newBook);
};