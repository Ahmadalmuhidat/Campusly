const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const societyJoinRequestSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  Society: String,
  User: String,
  Status: { type: String, default: 'pending' },
  RequestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SocietyJoinRequest', societyJoinRequestSchema);