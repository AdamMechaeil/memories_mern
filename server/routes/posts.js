
 
const express = require('express');
const { getPosts, createPost,getPostsBySearch, getPost, deletePost, updatePost,likePost } = require('../controllers/postControllers');
const {auth} = require('../middleware/auth');

const postRouter = express.Router();

postRouter.get('/search', getPostsBySearch);
postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/',auth, createPost);
postRouter.delete('/:id',auth ,deletePost);
postRouter.patch('/:id',auth,updatePost);
postRouter.patch('/:id/likePost',auth,likePost);

module.exports = postRouter;

