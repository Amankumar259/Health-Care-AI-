const express = require('express');
const { addHealthStats, getHealthStats } = require('../controllers/healthController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router.post('/add', addHealthStats);
router.get('/:userId?', getHealthStats);

module.exports = router;