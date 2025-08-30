const mongoose = require('mongoose');

const healthStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  steps: {
    type: Number,
    default: 0,
    min: 0
  },
  sleepHours: {
    type: Number,
    min: 0,
    max: 24
  },
  heartRate: {
    type: Number,
    min: 30,
    max: 250
  },
  bloodPressure: {
    systolic: { type: Number, min: 70, max: 250 },
    diastolic: { type: Number, min: 40, max: 150 }
  },
  weight: {
    type: Number,
    min: 10
  },
  mood: {
    type: String,
    enum: ['great', 'good', 'okay', 'stressed', 'unwell']
  },
  waterIntake: {
    type: Number, // in glasses
    default: 0,
    min: 0
  },
  exerciseMinutes: {
    type: Number,
    default: 0,
    min: 0
  },
  caloriesConsumed: {
    type: Number,
    min: 0
  },
  caloriesBurned: {
    type: Number,
    min: 0
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Create compound index for user and date
healthStatsSchema.index({ userId: 1, date: 1 }, { unique: true });

// Calculate risk score based on health data
healthStatsSchema.methods.calculateRiskScore = function() {
  let riskScore = 0;
  let factors = 0;

  // Heart rate assessment
  if (this.heartRate) {
    if (this.heartRate < 60 || this.heartRate > 100) riskScore += 1;
    factors++;
  }

  // Blood pressure assessment
  if (this.bloodPressure && this.bloodPressure.systolic && this.bloodPressure.diastolic) {
    if (this.bloodPressure.systolic > 140 || this.bloodPressure.diastolic > 90) riskScore += 2;
    else if (this.bloodPressure.systolic > 130 || this.bloodPressure.diastolic > 80) riskScore += 1;
    factors++;
  }

  // Sleep assessment
  if (this.sleepHours) {
    if (this.sleepHours < 6 || this.sleepHours > 9) riskScore += 1;
    factors++;
  }

  // Activity assessment
  if (this.steps) {
    if (this.steps < 5000) riskScore += 1;
    factors++;
  }

  if (factors === 0) return 'unknown';

  const avgRisk = riskScore / factors;
  if (avgRisk <= 0.3) return 'low';
  if (avgRisk <= 0.7) return 'medium';
  return 'high';
};

module.exports = mongoose.model('HealthStats', healthStatsSchema);