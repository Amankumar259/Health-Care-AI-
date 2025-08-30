const HealthStats = require('../models/HealthStats');
const User = require('../models/User');

// @desc    Add health stats
// @route   POST /api/health/add
// @access  Private
const addHealthStats = async (req, res) => {
  try {
    const {
      date,
      steps,
      sleepHours,
      heartRate,
      bloodPressure,
      weight,
      mood,
      waterIntake,
      exerciseMinutes,
      caloriesConsumed,
      caloriesBurned,
      notes
    } = req.body;

    // Check if stats already exist for this date
    const existingStats = await HealthStats.findOne({
      userId: req.user.id,
      date: new Date(date || Date.now()).toDateString()
    });

    let healthStats;

    if (existingStats) {
      // Update existing stats
      Object.assign(existingStats, {
        steps: steps !== undefined ? steps : existingStats.steps,
        sleepHours: sleepHours !== undefined ? sleepHours : existingStats.sleepHours,
        heartRate: heartRate !== undefined ? heartRate : existingStats.heartRate,
        bloodPressure: bloodPressure !== undefined ? bloodPressure : existingStats.bloodPressure,
        weight: weight !== undefined ? weight : existingStats.weight,
        mood: mood !== undefined ? mood : existingStats.mood,
        waterIntake: waterIntake !== undefined ? waterIntake : existingStats.waterIntake,
        exerciseMinutes: exerciseMinutes !== undefined ? exerciseMinutes : existingStats.exerciseMinutes,
        caloriesConsumed: caloriesConsumed !== undefined ? caloriesConsumed : existingStats.caloriesConsumed,
        caloriesBurned: caloriesBurned !== undefined ? caloriesBurned : existingStats.caloriesBurned,
        notes: notes !== undefined ? notes : existingStats.notes
      });

      healthStats = await existingStats.save();
    } else {
      // Create new stats
      healthStats = await HealthStats.create({
        userId: req.user.id,
        date: date || Date.now(),
        steps,
        sleepHours,
        heartRate,
        bloodPressure,
        weight,
        mood,
        waterIntake,
        exerciseMinutes,
        caloriesConsumed,
        caloriesBurned,
        notes
      });
    }

    // Update user's weight if provided
    if (weight) {
      await User.findByIdAndUpdate(req.user.id, { weight });
    }

    // Calculate risk score
    const riskScore = healthStats.calculateRiskScore();

    res.json({
      success: true,
      message: 'Health stats saved successfully',
      data: {
        ...healthStats.toObject(),
        riskScore
      }
    });
  } catch (error) {
    console.error('Add health stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving health stats',
      error: error.message
    });
  }
};

// @desc    Get user health stats
// @route   GET /api/health/:userId?period=week&limit=30
// @access  Private
const getHealthStats = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const { period = 'week', limit = 30 } = req.query;

    // Check if user can access this data
    if (userId !== req.user.id.toString()) {
      const targetUser = await User.findById(userId);
      if (!targetUser || targetUser.preferences.privacy.profileVisibility === 'private') {
        return res.status(403).json({
          success: false,
          message: 'Access denied to this user\'s health data'
        });
      }
    }

    // Calculate date range
    let startDate = new Date();
    switch (period) {
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const healthStats = await HealthStats.find({
      userId,
      date: { $gte: startDate }
    })
    .sort({ date: -1 })
    .limit(parseInt(limit));

    // Calculate summary statistics
    const summary = {
      totalDays: healthStats.length,
      avgSteps: 0,
      avgSleep: 0,
      avgHeartRate: 0,
      totalExerciseMinutes: 0
    };

    if (healthStats.length > 0) {
      const validSteps = healthStats.filter(s => s.steps > 0);
      const validSleep = healthStats.filter(s => s.sleepHours > 0);
      const validHeartRate = healthStats.filter(s => s.heartRate > 0);
      
      summary.avgSteps = validSteps.length > 0 
        ? Math.round(validSteps.reduce((sum, s) => sum + s.steps, 0) / validSteps.length)
        : 0;
      
      summary.avgSleep = validSleep.length > 0 
        ? Math.round((validSleep.reduce((sum, s) => sum + s.sleepHours, 0) / validSleep.length) * 10) / 10
        : 0;
      
      summary.avgHeartRate = validHeartRate.length > 0 
        ? Math.round(validHeartRate.reduce((sum, s) => sum + s.heartRate, 0) / validHeartRate.length)
        : 0;
      
      summary.totalExerciseMinutes = healthStats.reduce((sum, s) => sum + (s.exerciseMinutes || 0), 0);
    }

    res.json({
      success: true,
      data: {
        stats: healthStats,
        summary,
        period,
        userId
      }
    });
  } catch (error) {
    console.error('Get health stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching health stats',
      error: error.message
    });
  }
};

module.exports = {
  addHealthStats,
  getHealthStats
};