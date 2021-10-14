
// const { application } = require('express');
const express = require('express');
const { getPosts, createPost, deletePost, updatePost,likePost } = require('../controllers/postControllers');


const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);
postRouter.patch('/:id',updatePost);
postRouter.patch('/:id/likePost',likePost);

module.exports = postRouter;