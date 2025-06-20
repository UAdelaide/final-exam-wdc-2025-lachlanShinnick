const express = require('express');
const router = express.Router();
const db = require('../models.db');

//GET /api/owners/:ownerId/dogs

router.get('owners/;ownerId/dogs', async (req, res => {
    const { ownerId } = req.params;

    try{
        const [rows]
    }
}))