const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Community name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Community description is required']
  },
  location: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['neighborhood', 'workplace', 'school', 'club', 'city', 'virtual'],
    default: 'neighborhood'
  },
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'admin'],
      default: 'member'
    },
    totalSteps: {
      type: Number,
      default: 0
    },
    totalPoints: {
      type: Number,
      default: 0
    }
  }],
  challenges: [{
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge'
    },
    title: String,
    totalProgress: { type: Number, default: 0 },
    targetValue: Number,
    participants: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  }],
  totalSteps: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Get community leaderboard
communitySchema.methods.getLeaderboard = function() {
  return this.members
    .sort((a, b) => b.totalSteps - a.totalSteps)
    .slice(0, 10)
    .map((member, index) => ({
      rank: index + 1,
      userId: member.userId,
      totalSteps: member.totalSteps,
      totalPoints: member.totalPoints
    }));
};

// Update member stats
communitySchema.methods.updateMemberStats = function(userId, steps, points) {
  const member = this.members.find(m => m.userId.toString() === userId.toString());
  if (member) {
    member.totalSteps += steps || 0;
    member.totalPoints += points || 0;
    this.totalSteps += steps || 0;
  }
};

module.exports = mongoose.model('Community', communitySchema);