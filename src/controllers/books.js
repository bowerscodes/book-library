const { Book, Reader } = require('../models');

exports.create = async (req, res) => {

    try {
        const newBook = await Book.create(req.body);
        
        res.status(201).json(newBook);
    } catch (err) {
        res.sendStatus(500)
    }
    

};

exports.read = async (_, res) => {
    const books = await Book.findAll();

    res.status(200).json(books);
};

exports.readById = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);

    if (!book) {
        res.status(404).json({ error: 'The book could not be found.' })
    } else {
        res.status(200).json(book)
    }
};

exports.update = async (req,res) => {
    const bookId = req.params.id;
    const updateData = req.body;

    const [ updatedRows ] = await Book.update(updateData, { where: { id: bookId } });

    if (!updatedRows) {
        res.status(404).json({ error: 'The book could not be found.' })
    } else {
        res.status(200).send();
    }
};

exports.delete = async (req, res) => {
    const bookId = req.params.id;
    
    const deletedRows = await Book.destroy({ where: { id: bookId } });

    if (!deletedRows) {
        res.status(404).json({ error: 'The book could not be found.' })
    } else {
        res.status(204).send();
    }
};