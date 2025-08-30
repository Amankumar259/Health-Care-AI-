const express = require('express');
const { getCommunityChallenge, updateCommunityProgress } = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router.get('/', getCommunityChallenge);
router.post('/update', updateCommunityProgress);

module.exports = router;