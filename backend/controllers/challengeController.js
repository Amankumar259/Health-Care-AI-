const Challenge = require('../models/Challenge');
const User = require('../models/User');

// @desc    Create a new challenge
// @route   POST /api/challenges/create
// @access  Private
const createChallenge = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      category,
      targetValue,
      targetUnit,
      points,
      startDate,
      endDate
    } = req.body;

    const challenge = await Challenge.create({
      title,
      description,
      type,
      category,
      targetValue,
      targetUnit,
      points: points || 50,
      startDate: startDate || Date.now(),
      endDate,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Challenge created successfully',
      data: challenge
    });
  } catch (error) {
    console.error('Create challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating challenge',
      error: error.message
    });
  }
};

// @desc    Get active challenges
// @route   GET /api/challenges/active
// @access  Private
const getActiveChallenges = async (req, res) => {
  try {
    const { type, category } = req.query;
    
    const query = {
      isActive: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    };

    if (type) query.type = type;
    if (category) query.category = category;

    const challenges = await Challenge.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    // Add user's participation status
    const challengesWithStatus = challenges.map(challenge => {
      const userParticipation = challenge.participants.find(
        p => p.userId.toString() === req.user.id.toString()
      );

      return {
        ...challenge.toObject(),
        userParticipating: !!userParticipation,
        userProgress: userParticipation ? challenge.getUserProgress(req.user.id) : 0,
        userCompleted: userParticipation ? userParticipation.completed : false,
        participantCount: challenge.participants.length
      };
    });

    res.json({
      success: true,
      count: challengesWithStatus.length,
      data: challengesWithStatus
    });
  } catch (error) {
    console.error('Get active challenges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching challenges',
      error: error.message
    });
  }
};

// @desc    Join a challenge
// @route   POST /api/challenges/:id/join
// @access  Private
const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    if (!challenge.isActive || challenge.endDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Challenge is not active or has ended'
      });
    }

    // Check if user already joined
    const existingParticipant = challenge.participants.find(
      p => p.userId.toString() === req.user.id.toString()
    );

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: 'You have already joined this challenge'
      });
    }

    // Add user to participants
    challenge.participants.push({
      userId: req.user.id,
      joinedAt: new Date(),
      progress: 0,
      completed: false
    });

    await challenge.save();

    res.json({
      success: true,
      message: 'Successfully joined the challenge',
      data: {
        challengeId: challenge._id,
        userProgress: 0,
        participantCount: challenge.participants.length
      }
    });
  } catch (error) {
    console.error('Join challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while joining challenge',
      error: error.message
    });
  }
};

// @desc    Complete a challenge
// @route   POST /api/challenges/:id/complete
// @access  Private
const completeChallenge = async (req, res) => {
  try {
    const { progress } = req.body;
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Find user's participation
    const participantIndex = challenge.participants.findIndex(
      p => p.userId.toString() === req.user.id.toString()
    );

    if (participantIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'You have not joined this challenge'
      });
    }

    // Update progress
    challenge.participants[participantIndex].progress = progress || challenge.targetValue;
    
    // Check if completed
    if (challenge.participants[participantIndex].progress >= challenge.targetValue) {
      challenge.participants[participantIndex].completed = true;
      challenge.participants[participantIndex].completedAt = new Date();

      // Award points to user
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { totalPoints: challenge.points }
      });
    }

    await challenge.save();

    res.json({
      success: true,
      message: challenge.participants[participantIndex].completed 
        ? 'Challenge completed! Points awarded.' 
        : 'Progress updated successfully',
      data: {
        progress: challenge.participants[participantIndex].progress,
        completed: challenge.participants[participantIndex].completed,
        pointsAwarded: challenge.participants[participantIndex].completed ? challenge.points : 0
      }
    });
  } catch (error) {
    console.error('Complete challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing challenge',
      error: error.message
    });
  }
};

// @desc    Get challenge leaderboard
// @route   GET /api/challenges/leaderboard/:id
// @access  Private
const getChallengeLeaderboard = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('participants.userId', 'name');
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    const leaderboard = challenge.getLeaderboard();

    res.json({
      success: true,
      data: {
        challengeTitle: challenge.title,
        leaderboard: leaderboard.map(entry => ({
          rank: entry.rank,
          user: challenge.participants.find(p => 
            p.userId._id.toString() === entry.userId.toString()
          )?.userId,
          progress: entry.progress,
          completed: entry.completed,
          completedAt: entry.completedAt,
          progressPercentage: Math.round((entry.progress / challenge.targetValue) * 100)
        }))
      }
    });
  } catch (error) {
    console.error('Get challenge leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard',
      error: error.message
    });
  }
};

module.exports = {
  createChallenge,
  getActiveChallenges,
  joinChallenge,
  completeChallenge,
  getChallengeLeaderboard
};