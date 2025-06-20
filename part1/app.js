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
        try {
            const [rows] = await pool.query(`
                SELECT d.name AS dog_name, d.size, u.username AS owner_username
                FROM Dogs d
                JOIN Users u ON d.owner_id = u.user_id
                `);
                res.json(rows);
        } catch {
            res.status(500).json({error : 'Failed to fetch dogs'});
        }
    });

    app.get('/api/walkrequests/open', async (req, res) => {
        try {
            const [rows] = await pool.query(`
                SELECT
                    wr.request_id,
                    d.name AS dog_name,
                    wr.requested_time,
                    wr.duration_minutes,
                    wr.location,
                    u.username AS owner_username
                FROM WalkRequests wr
                JOIN Dogs d ON wr.dog_id = d.dog_id
                JOIN Users u ON d.owner_id = u.user_id
                WHERE wr.status = 'open'
            `);
            res.json(rows);
        } catch (err) {
            console.error('GET /api/walkrequests/open error', err);
            res.status(500).json({ error : 'Failed to fetch open walk requests'});
        }
    });

    app.get('/api/walkers/summary', async (req, res) => {
        try {
            const [rows] = await pool.query(`
                SELECT
                u.userna
                `)
        }
    })

    app.listen(3000, () => console.log('listening on http://localhost:3000'));

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});