const getDb = require('../services/db');
const { Reader } = require('../models');




exports.create = async (req, res) => {
    const db = await getDb();
    const newReader = await Reader.create(req.body);

    res.status(201).json(newReader);

    // try {
    //     await db.query('INSERT INTO Reader (name, email) VALUES(?, ?)', [
    //         name,
    //         email,
    //     ]);

    //     res.sendStatus(201);
    // } catch (err) {
    //     res.sendStatus(500).json(err);
    // }

    // db.close();  
};