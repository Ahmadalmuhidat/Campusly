const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const eventInteractionsSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  Event: { type: String, required: true },
  User: { type: String, required: true },
  Action: { 
    type: String, 
    enum: [ 'share', 'view'], 
    required: true 
  },
  CreatedAt: { type: Date, default: Date.now }
});

eventInteractionsSchema.index({ Event: 1, Action: 1 });
eventInteractionsSchema.index({ User: 1, Action: 1 });

module.exports = mongoose.model("EventInteractions", eventInteractionsSchema);
