const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const societyMemberSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  Society: String,
  User: String,
  Role: {
    type: String,
    enum: ['admin', 'moderator', 'member'],
    default: 'member'
  },
  JoinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SocietyMember', societyMemberSchema);
