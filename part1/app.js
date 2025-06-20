const express = require('express');
const fs = re

async function seed() {
    const sql = fs.readFileSync(path.join(__dirname, 'dogwalks.sql'), 'utf8');
    await pool.query(sql);
}

asybc function main() {
    await seed();
    const app = express();
}