const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const commentSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  Post: String,
  User: String,
  Content: String,
  CreatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
