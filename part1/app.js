const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function seed() {
    const sql = fs.readFileSync(path.join(__dirname, 'dogwalks.sql'), 'utf8');
    await pool.query(sql);
}

async function main() {
    await seed();
    const app = express();

    app.get('/api/dogs', async (req, res) => {
        try
            const [rows] = await pool.query(`
                SELECT d.name AS dog_name, d.size, u.username AS owner_username
                FROM Dogs d
                JOIN Users u ON owner_id = u.user_id
                `);
                res.json(rows);
        } catch {
            res.status(500).json({error : 'Failed to fetch dogs'});
        }
    });

    app.listen(3000, () => console.log('liste'))

}