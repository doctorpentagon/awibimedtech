const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't include password in queries by default
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: '',
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
  },
  
  // Location Information
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  
  // Professional Information
  profession: {
    type: String,
    maxlength: [100, 'Profession cannot exceed 100 characters'],
  },
  institution: {
    type: String,
    maxlength: [100, 'Institution cannot exceed 100 characters'],
  },
  specialization: {
    type: String,
    maxlength: [100, 'Specialization cannot exceed 100 characters'],
  },
  
  // Social Links
  linkedIn: {
    type: String,
    default: '',
  },
  twitter: {
    type: String,
    default: '',
  },
  
  // Role and Permissions
  role: {
    type: String,
    enum: ['Member', 'Leader', 'Ambassador', 'Admin', 'Super Admin'],
    default: 'Member',
  },
  
  // Chapter Association
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
  },
  
  // Badges and Achievements
  badges: [{
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge',
    },
    earnedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Activity Tracking
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  
  // Authentication
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  googleId: {
    type: String,
    sparse: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  
  // Password Reset
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    desktopNotifications: {
      type: Boolean,
      default: true,
    },
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: 'English',
    },
  },
  
  // Statistics
  stats: {
    eventsAttended: {
      type: Number,
      default: 0,
    },
    badgesEarned: {
      type: Number,
      default: 0,
    },
    contributionScore: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for badge count
userSchema.virtual('badgeCount').get(function() {
  return this.badges.length;
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ chapter: 1 });
userSchema.index({ role: 1 });
userSchema.index({ country: 1, city: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified and exists
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update badge count
userSchema.pre('save', function(next) {
  this.stats.badgesEarned = this.badges.length;
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');
  
  this.passwordResetToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance method to generate email verification token
userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = require('crypto').randomBytes(32).toString('hex');
  
  this.emailVerificationToken = require('crypto')
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Static method to find users by chapter
userSchema.statics.findByChapter = function(chapterId) {
  return this.find({ chapter: chapterId, isActive: true });
};

// Static method to find leaders
userSchema.statics.findLeaders = function() {
  return this.find({ 
    role: { $in: ['Leader', 'Ambassador', 'Admin', 'Super Admin'] },
    isActive: true 
  });
};

module.exports = mongoose.model('User', userSchema);

