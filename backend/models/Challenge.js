const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Challenge title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Challenge description is required']
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'community'],
    default: 'daily'
  },
  category: {
    type: String,
    enum: ['steps', 'exercise', 'sleep', 'nutrition', 'hydration', 'mindfulness'],
    required: true
  },
  targetValue: {
    type: Number,
    required: true
  },
  targetUnit: {
    type: String,
    required: true // e.g., 'steps', 'minutes', 'hours', 'glasses'
  },
  points: {
    type: Number,
    default: 50
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Calculate completion percentage for a user
challengeSchema.methods.getUserProgress = function(userId) {
  const participant = this.participants.find(p => p.userId.toString() === userId.toString());
  if (!participant) return 0;
  
  return Math.min(100, Math.round((participant.progress / this.targetValue) * 100));
};

// Get leaderboard for the challenge
challengeSchema.methods.getLeaderboard = function() {
  return this.participants
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 10)
    .map((participant, index) => ({
      rank: index + 1,
      userId: participant.userId,
      progress: participant.progress,
      completed: participant.completed,
      completedAt: participant.completedAt
    }));
};

module.exports = mongoose.model('Challenge', challengeSchema);