const express = require('express');
const mongoose = require('mongoose');
// const { findById } = require('../models/Post.js');

const PostMessage = require('../models/Post.js');




exports.getPosts = async (req, res) => {

    try {

        const posts = await PostMessage.find();

        res.status(200).json(posts);


    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }



    // return res.status(200).json({
    //     success: true,
    //     body: "Hello Sir"
    //   });

    // return(
    //     res.status=200,
    //     res.body='Hello Sir'
    // )




}

exports.createPost = async (req, res) => {

    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


exports.updatePost = async (req, res) => {


    const { id: _id } = req.params;
    //  const {title,message,creator,selectedFile,tags}= req.body;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id : ${_id}`);

    // const updatedPost=  {title,message,creator,selectedFile,tags,_id:id};

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);


}

exports.likePost= async (req,res)=>{
   
    const {id: _id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id : ${_id}`);

    const post = await PostMessage.findById(_id);
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,{likeCount:post.likeCount+1}, {new:true});
    res.json(updatedPost);

} 


exports.deletePost = async (req, res) => {


    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });

}