const express = require ('express');
const readerController = require('../controllers/readers');

const router = express.Router();

router.post('/', readerController.create);

router.get('/', readerController.read);

router.get('/:id', readerController.readById);



module.exports = router;