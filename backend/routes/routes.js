const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

// Routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/user', userController.getUser)
router.get('/user/:id', userController.getUserById)

router.get('/posts', postController.getPosts)
router.post('/posts/create-post', postController.createPost)
router.get('/posts/:id', postController.getPost)
router.put('/posts/:id', postController.updatePost)
router.delete('/posts/:id', postController.deletePost)

router.post('/posts/:id/comments', commentController.createComment)
router.get('/posts/:id/comments', commentController.getComments)
router.delete('/posts/:id/comments/:commentId', commentController.deleteComment)

module.exports = router
