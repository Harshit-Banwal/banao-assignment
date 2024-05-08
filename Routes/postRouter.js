const express = require('express');
const { verifyAccessToken } = require('../middlewares');
const {
  createPost,
  getAllPosts,
  getPosts,
  deletePost,
  updatePost,
  likeAPost,
  commentOnPost,
} = require('../controllers/postControllers');
const postRouter = express.Router();

// Routes beginning with /api/post
postRouter.get('/', getAllPosts);
postRouter.get('/userPosts', verifyAccessToken, getPosts);
postRouter.post('/', verifyAccessToken, createPost);
postRouter.put('/:postId', verifyAccessToken, updatePost);
postRouter.patch('/like/:postId', verifyAccessToken, likeAPost);
postRouter.patch('/comment/:postId', verifyAccessToken, commentOnPost);
postRouter.delete('/:postId', verifyAccessToken, deletePost);

module.exports = postRouter;
