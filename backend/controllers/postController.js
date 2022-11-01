const { body, validationResult } = require('express-validator')

const Post = require('../models/post')

// GET /posts API
exports.getPosts = (req, res, next) => {
  Post.find()
    .populate('comments')
    .exec((err, posts) => {
      if (err) {
        return next(err)
      }

      res.status(200).json({ posts })
    })
}

// POST /posts API - createPost only if user has 'admin' role
exports.createPost = [
  // Validate and sanitize fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }),
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
      // Create a Post object with escaped and trimmed data.
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
      }).save((err) => {
        if (err) {
          return next(err)
        }
        // Post saved. Redirect to posts page.
        res.status(200).json({ message: 'Post created!' })
      })
    }
  },
]

// GET /posts/:id API
exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    // .populate('userId')
    .populate('comments')
    .exec((err, post) => {
      if (err) {
        return next(err)
      }

      res.status(200).json({ post })
    })
}

// DELETE /posts/:id API - deletePost only if user has 'admin' role
exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err)
    }

    res.status(200).json({ message: 'Post deleted!' })
  })
}



// Find one and update post
exports.updatePost = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      return next(err)
    }

    res.status(200).json({ message: 'Post updated!' })
  })
}
