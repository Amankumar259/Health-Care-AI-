const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not Google OAuth user
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  googleId: {
    type: String,
    sparse: true
  },
  age: {
    type: Number,
    min: [1, 'Age must be positive'],
    max: [150, 'Age must be realistic']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  height: {
    type: Number, // in cm
    min: [50, 'Height must be realistic']
  },
  weight: {
    type: Number, // in kg
    min: [10, 'Weight must be realistic']
  },
  language: {
    type: String,
    enum: ['english', 'hindi', 'bengali', 'tamil', 'marathi'],
    default: 'english'
  },
  preferences: {
    notifications: {
      dailyReminders: { type: Boolean, default: true },
      challengeUpdates: { type: Boolean, default: true },
      communityActivity: { type: Boolean, default: false },
      healthTips: { type: Boolean, default: true }
    },
    privacy: {
      shareWithCommunity: { type: Boolean, default: true },
      anonymousData: { type: Boolean, default: false },
      profileVisibility: { 
        type: String, 
        enum: ['public', 'friends', 'private'],
        default: 'friends'
      }
    },
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    darkMode: { type: Boolean, default: false }
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  joinedCommunities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  }],
  achievements: [{
    badgeId: String,
    earnedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  if (this.password) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate BMI
userSchema.methods.calculateBMI = function() {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100;
    return Math.round((this.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }
  return null;
};

module.exports = mongoose.model('User', userSchema);