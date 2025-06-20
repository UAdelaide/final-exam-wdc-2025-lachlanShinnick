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
                    u.username AS walker_username,
                    COUNT (r.rating) AS total_ratings,
                    AVG(r.rating) AS average_rating,
                    SUM(
                        CASE
                            WHEN wr.status = 'completed
                            AND wa.status = 'accepted'
                            THEN 1 ELSE 0
                        END
                    ) AS completed_walks
                FROM Users u
                LEFT JOIN WalkRatings r
                    ON u.user_id = r.walker_id
                LEFT JOIN WalkRequests wr
                    ON wa.request_id = wr.request_id
                WHERE u.role = 'walker
                GROUP BY u.user_id, u.username
                `);
                res.json(rows);
        } catch (err) {
            console.error('GET /api/walkers/summary error:', err);
            res.status(500).json({ error: 'Failed to fetch walker summary'})
        }
    })

    app.listen(3000, () => console.log('listening on http://localhost:3000'));

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});