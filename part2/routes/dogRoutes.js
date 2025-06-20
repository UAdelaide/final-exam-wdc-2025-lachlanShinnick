const express = require('express');
const router = express.Router();
const db = require('../models/db');

//GET /api/owners/:ownerId/dogs

router.get('/owners/:ownerId/dogs', async (req, res) => {
    const { ownerId } = req.params;

    try {
        const [rows] = await db.query(
            'SELECT dog_id, name, size FROM Dogs WHERE owner_id = ?',
            [ownerId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load dogs' });
    }
});

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                d.dog_id,
                d.name,
                d.size,
                d.owner_id
            FROM Dogs d
            `);
            res.json(rows);
    } catch (err) {
        console.error('Failed to fetch all dogs:', err);
        res.status(500).json({ error: 'Failed to load all dogs'});
    }
});

module.exports = router;