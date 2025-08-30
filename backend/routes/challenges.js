const express = require('express');
const {
  createChallenge,
  getActiveChallenges,
  joinChallenge,
  completeChallenge,
  getChallengeLeaderboard
} = require('../controllers/challengeController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router.post('/create', createChallenge);
router.get('/active', getActiveChallenges);
router.post('/:id/join', joinChallenge);
router.post('/:id/complete', completeChallenge);
router.get('/leaderboard/:id', getChallengeLeaderboard);

module.exports = router;