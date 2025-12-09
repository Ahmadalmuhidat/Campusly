const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const likeSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  User: String,
  Post: String,
  CreatedAt: { type: Date, default: Date.now }
});

likeSchema.index({ User: 1, Post: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
