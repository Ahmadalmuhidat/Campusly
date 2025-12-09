const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const societyInviteSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  Society: String,
  Inviter: String,
  Invitee: String,
  Status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  CreatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SocietyInvite', societyInviteSchema);
