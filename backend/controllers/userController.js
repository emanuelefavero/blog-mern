const passport = require('passport')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')

const User = require('../models/user')

// register API
exports.register = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

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
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, send error.
          res.status(400).json({ message: 'User already exists.' })
        } else {
          // User does not exist, create new user.
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err)
            }

            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            }).save((err) => {
              if (err) {
                return next(err)
              }
              // Registration successful.
              // req.user = user

              res.status(200).json({ message: 'Registration successful!' })
            })
          })
        }
      })
    }
  },
]

// login API
exports.login = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

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
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, check password.
          bcrypt.compare(
            req.body.password,
            foundUser.password,
            (err, result) => {
              if (err) {
                return next(err)
              }

              if (result === true) {
                // Passwords match. Log user in.
                req.login(foundUser, (err) => {
                  if (err) {
                    return next(err)
                  }

                  // pass the user to the next middleware
                  // req.user = foundUser

                  // Authentication successful.
                  res.status(200).json({ message: 'Login successful!' })
                })
              } else {
                // Passwords do not match.
                res.status(400).json({ message: 'Incorrect password.' })
              }
            }
          )
        } else {
          // User does not exist.
          res.status(400).json({ message: 'User does not exist.' })
        }
      })
    }
  },
]

// logout API
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }

    res.status(200).json({ message: 'Logout successful!' })
  })
}

// get user API
exports.getUser = (req, res, next) => {
  res.send(req.user)
}

// get user by id
exports.getUserById = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      return next(err)
    }
    if (user === null) {
      const err = new Error('User not found')
      err.status = 404
      return next(err)
    }
    res.send(user)
  })
}
