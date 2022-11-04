require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

const app = express()

// Mongoose
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to MongoDB')
  }
)

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    // NOTE: PRODUCTION
    origin: 'https://blog-mern-client.onrender.com',

    // NOTE: DEVELOPMENT
    // origin: 'https://localhost:3000',
    credentials: true,
  })
)
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
)
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

// Routes
app.use('/api', routes)

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
