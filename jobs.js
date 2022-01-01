const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// GET all jobs with pagination
router.get('/', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const jobs = await Job.find().skip(skip).limit(limit);
    res.json(jobs);
});

module.exports = router;