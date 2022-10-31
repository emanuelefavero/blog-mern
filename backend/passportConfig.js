const User = require('./models/user')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

// Define a local strategy for passport to use
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne(
        {
          username: username,
        },
        (err, user) => {
          if (err) throw err
          // If there is no user with that username:
          if (!user) return done(null, false) // null means no error, false means no user
          // If there is a user with that username:
          // Compare the password the user entered with the password in the database
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err
            if (result === true) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })
        }
      )
    })
  )

  // Serialize the user (serializeUser stores a cookie with the user.id in the browser)
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  // Deserialize the user (deserializeUser takes the cookie and finds the user in the database)
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      // TIP: Here instead of passing the entire user, you can pass only the user.username so other data such as password is not exposed:
      const userInformation = {
        username: user.username,
        role: user.role,
      }
      cb(err, userInformation)
      // cb(err, user)
    })
  })
}
