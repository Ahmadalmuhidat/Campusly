const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// const commentSchema = new mongoose.Schema({
//   ID: { type: String, default: uuidv4 },
//   User: String,
//   Content: String,
//   CreatedAt: { type: Date, default: Date.now }
// });

// const likeSchema = new mongoose.Schema({
//   ID: { type: String, default: uuidv4 },
//   User: String,
//   CreatedAt: { type: Date, default: Date.now }
// });

// // Make likes unique per user inside array
// likeSchema.index({ User: 1 }, { unique: false });

// const postSchema = new mongoose.Schema({
//   ID: { type: String, unique: true },
//   Content: String,
//   Image: String,
//   User: String,
//   Society: String,
//   CreatedAt: { type: Date, default: Date.now },

//   Likes: { type: [likeSchema], default: [] },
//   Comments: { type: [commentSchema], default: [] },

//   LikesCount: { type: Number, default: 0 },
//   CommentsCount: { type: Number, default: 0 }
// });

const postSchema = new mongoose.Schema({
  ID: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() { return uuidv4(); }
  },
  Content: String,
  Image: String,
  User: String,
  Society: String,
  LikesCount: { type: Number, default: 0 },
  CommentsCount: { type: Number, default: 0 },
  CreatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
