const User = require('../models/User');
const HealthStats = require('../models/HealthStats');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get latest health stats
    const latestHealthStats = await HealthStats.findOne({ 
      userId: req.user.id 
    }).sort({ date: -1 });

    // Calculate BMI
    const bmi = user.calculateBMI();

    // Get average sleep from last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const weeklyStats = await HealthStats.find({
      userId: req.user.id,
      date: { $gte: lastWeek },
      sleepHours: { $exists: true, $ne: null }
    });

    const avgSleep = weeklyStats.length > 0 
      ? weeklyStats.reduce((sum, stat) => sum + stat.sleepHours, 0) / weeklyStats.length
      : null;

    // Calculate weekly activity score (based on steps and exercise)
    const weeklyActivityStats = await HealthStats.find({
      userId: req.user.id,
      date: { $gte: lastWeek }
    });

    let activityScore = 0;
    if (weeklyActivityStats.length > 0) {
      const totalSteps = weeklyActivityStats.reduce((sum, stat) => sum + (stat.steps || 0), 0);
      const totalExercise = weeklyActivityStats.reduce((sum, stat) => sum + (stat.exerciseMinutes || 0), 0);
      
      const avgSteps = totalSteps / weeklyActivityStats.length;
      const avgExercise = totalExercise / weeklyActivityStats.length;
      
      // Score out of 100
      activityScore = Math.min(100, Math.round(
        (avgSteps / 10000) * 60 + (avgExercise / 30) * 40
      ));
    }

    // Get risk score from latest health stats
    const riskScore = latestHealthStats ? latestHealthStats.calculateRiskScore() : 'unknown';

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          language: user.language,
          preferences: user.preferences,
          totalPoints: user.totalPoints,
          achievements: user.achievements
        },
        healthStats: {
          bmi: bmi ? Math.round(bmi * 10) / 10 : null,
          avgSleep: avgSleep ? Math.round(avgSleep * 10) / 10 : null,
          weeklyActivityScore: activityScore,
          riskScore,
          latestStats: latestHealthStats
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['name', 'age', 'gender', 'height', 'weight', 'language', 'preferences'];
    const updates = {};

    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        language: user.language,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile',
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};