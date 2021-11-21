
 
const express = require('express');
const { getPosts, createPost, deletePost, updatePost,likePost } = require('../controllers/postControllers');
const {auth} = require('../middleware/auth');

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/',auth, createPost);
postRouter.delete('/:id',auth ,deletePost);
postRouter.patch('/:id',auth,updatePost);
postRouter.patch('/:id/likePost',auth,likePost);

module.exports = postRouter;

