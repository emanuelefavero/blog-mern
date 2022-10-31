const { body, validationResult } = require('express-validator')

const Comment = require('../models/comment')

// POST /posts/:id/comments API
exports.createComment = [
  // Validate and sanitize fields.
  body('content', 'Content must not be empty.').isLength({ min: 1 }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).json({ errors: errors.array() })
      return
    } else {
      // Data from form is valid.
      // Create a Comment object with escaped and trimmed data.
      const comment = new Comment({
        content: req.body.content,
        userId: req.user._id,
        postId: req.params.id,
      }).save((err) => {
        if (err) {
          return next(err)
        }
        // Comment saved. Redirect to post page.
        res.status(200).json({ message: 'Comment created!' })
      })
    }
  },
]

// GET /posts/:id/comments API
exports.getComments = (req, res, next) => {
  Comment.find({ postId: req.params.id })
    .populate('userId')
    .exec((err, comments) => {
      if (err) {
        return next(err)
      }

      res.status(200).json({ comments })
    })
}

// DELETE /posts/:id/comments/:commentId API
exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.commentId, (err) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({ message: 'Comment deleted!' })
  })
}
