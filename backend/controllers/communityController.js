const Community = require('../models/Community');
const User = require('../models/User');

// @desc    Get community challenges
// @route   GET /api/community
// @access  Private
const getCommunityChallenge = async (req, res) => {
  try {
    // For demo purposes, we'll create a default village walkathon challenge
    let community = await Community.findOne({ name: 'Village Walkathon 2024' });
    
    if (!community) {
      // Create default community challenge
      community = await Community.create({
        name: 'Village Walkathon 2024',
        description: 'Join your community in a month-long walking challenge to promote health and wellness together!',
        location: 'Community Wide',
        type: 'city',
        challenges: [{
          title: 'Village Walkathon 2024',
          totalProgress: 2450000,
          targetValue: 5000000,
          participants: 156,
          isActive: true
        }],
        totalSteps: 2450000,
        createdBy: req.user.id
      });
    }

    // Mock community leaderboard data
    const mockCommunities = [
      { 
        rank: 1, 
        name: "Green Valley Community", 
        steps: 450000, 
        members: 45,
        location: "North District"
      },
      { 
        rank: 2, 
        name: "Riverside Neighborhood", 
        steps: 420000, 
        members: 38,
        location: "East District"
      },
      { 
        rank: 3, 
        name: "Sunset Heights", 
        steps: 380000, 
        members: 52,
        location: "West District"
      },
      { 
        rank: 4, 
        name: "Market Square Area", 
        steps: 350000, 
        members: 29,
        location: "Central District"
      },
      { 
        rank: 5, 
        name: "Temple Road Community", 
        steps: 320000, 
        members: 41,
        location: "South District"
      }
    ];

    // Mock recent activities
    const recentActivities = [
      {
        user: "Rajesh Kumar",
        action: "completed daily challenge",
        time: "2 hours ago",
        points: "+50 points"
      },
      {
        user: "Meera Patel",
        action: "joined the community challenge",
        time: "4 hours ago",
        points: "Welcome!"
      },
      {
        user: "Amit Singh",
        action: "walked 12,000 steps",
        time: "6 hours ago",
        points: "+75 points"
      },
      {
        user: "Sunita Devi",
        action: "achieved weekly goal",
        time: "1 day ago",
        points: "+100 points"
      }
    ];

    const challenge = community.challenges[0];
    const progressPercentage = Math.round((challenge.totalProgress / challenge.targetValue) * 100);
    const daysLeft = Math.ceil((new Date('2024-02-15') - new Date()) / (1000 * 60 * 60 * 24));

    res.json({
      success: true,
      data: {
        challenge: {
          id: community._id,
          title: challenge.title || community.name,
          description: community.description,
          totalSteps: challenge.totalProgress,
          targetSteps: challenge.targetValue,
          participants: challenge.participants,
          progressPercentage,
          daysLeft: Math.max(0, daysLeft),
          prize: "Health screening camp for top village"
        },
        leaderboard: mockCommunities,
        recentActivities,
        userParticipating: community.members.some(m => 
          m.userId.toString() === req.user.id.toString()
        )
      }
    });
  } catch (error) {
    console.error('Get community challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching community challenge',
      error: error.message
    });
  }
};

// @desc    Update community progress
// @route   POST /api/community/update
// @access  Private
const updateCommunityProgress = async (req, res) => {
  try {
    const { steps, challengeId } = req.body;

    if (!steps || steps <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid step count is required'
      });
    }

    // Find or create community
    let community = await Community.findById(challengeId);
    
    if (!community) {
      community = await Community.findOne({ name: 'Village Walkathon 2024' });
    }

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community challenge not found'
      });
    }

    // Check if user is a member
    let member = community.members.find(m => 
      m.userId.toString() === req.user.id.toString()
    );

    if (!member) {
      // Add user as new member
      community.members.push({
        userId: req.user.id,
        joinedAt: new Date(),
        totalSteps: steps,
        totalPoints: Math.floor(steps / 100) // 1 point per 100 steps
      });
    } else {
      // Update existing member
      member.totalSteps += steps;
      member.totalPoints += Math.floor(steps / 100);
    }

    // Update challenge progress
    if (community.challenges.length > 0) {
      community.challenges[0].totalProgress += steps;
      community.challenges[0].participants = community.members.length;
    }

    // Update total community steps
    community.totalSteps += steps;

    await community.save();

    // Update user's total points
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalPoints: Math.floor(steps / 100) }
    });

    const progressPercentage = community.challenges.length > 0 
      ? Math.round((community.challenges[0].totalProgress / community.challenges[0].targetValue) * 100)
      : 0;

    res.json({
      success: true,
      message: 'Community progress updated successfully',
      data: {
        totalSteps: community.totalSteps,
        userContribution: steps,
        progressPercentage,
        pointsEarned: Math.floor(steps / 100),
        newMember: !member
      }
    });
  } catch (error) {
    console.error('Update community progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating community progress',
      error: error.message
    });
  }
};

module.exports = {
  getCommunityChallenge,
  updateCommunityProgress
};