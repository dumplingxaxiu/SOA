// tutionRouter.js

const express = require('express');
const router = express.Router();
const Tuition = require('../app/models/Tuition');

// Endpoint to get tuition data by student ID
router.get('/:studentID', async (req, res) => {
    const studentID = req.params.studentID;
    try {
        const tuition = await Tuition.findOne({ studentID: studentID });
        if (!tuition) {
            return res.status(404).json({ success: false, message: 'Tuition not found' });
        }

        return res.json({ success: true, tuition: tuition });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
