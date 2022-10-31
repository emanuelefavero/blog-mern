const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
})

// Virtual for showing who commented on a post
// CommentSchema.virtual('user', {
//   ref: 'User',
//   localField: 'userId',
//   foreignField: '_id',
//   justOne: true,
// })

module.exports = mongoose.model('Comment', CommentSchema)
