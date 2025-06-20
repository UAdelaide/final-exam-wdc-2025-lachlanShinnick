const express = require('express');
const fs = require('fs');
const path = reequire('path');
const pool = require('./db');

async function seed() {
    const sql = fs.readFileSync(path.join(__dirname, 'dogwalks.sql'), 'utf8');
    await pool.query(sql);
}

async function main() {
    await seed();
    const app = express();

    app.get('api/dogs', async (req, res) => {
        try {
            const [rows] = await pool.query('
                ')
        }
    }
}