const mongoose = require('mongoose');

const customTourRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A custom tour request must have a title.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for your requested tour.'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'Please specify the city or area for the tour.'],
    trim: true,
  },
  coverImage: {
    type: String,
    required: [true, 'Please provide a cover image URL.'],
  },
  requestedDate: {
    type: Date,
    required: [true, 'Please specify a date for the tour.'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Please specify the maximum group size.'],
    min: [2, 'A group must have at least 2 people.'],
    max: [50, 'Group size cannot exceed 50 people for a custom tour.'], // Good practice to add a max
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // We initialize the creator as the first participant
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'full', 'converted'],
    default: 'pending',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// A virtual property to easily check the number of participants
customTourRequestSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

// Automatically add the creator to the participants list on creation
customTourRequestSchema.pre('save', function(next) {
  if (this.isNew) {
    this.participants.push(this.creator);
  }
  next();
});

const CustomTourRequest = mongoose.model('CustomTourRequest', customTourRequestSchema);
module.exports = CustomTourRequest;