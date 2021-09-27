const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const role=require('../middleware/role')
const { Post , validatePost}= require('../models/posts-model');

const express = require('express');
const router = express.Router();
router.get('/',async (req,res)=>{
    const posts = await Post.find();
    res.send(posts);
})
router.get('/:id' ,async (req,res)=>{
   const post= await Post.findById(req.params.id);
   if(!post) res.status(404).send('post not found')
   res.send(post);
})
router.post('/',role,async (req,res)=>{
    const result=validatePost(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
   

    let post = new Post({
        title:req.body.title,
        postt:req.body.postt,
        author:req.body.author,
        imageURL:req.body.imageURL,
        date:req.body.date
    });
    post= await post.save();
    res.send(post);
})
router.put('/:id',role,async(req,res)=>{
    const result = validatePost(req.body); 
if(result.error){
    res.status(400).send(result.error.details[0].message)
}
 const post=await Post.findByIdAndUpdate(req.params.id,{ title:req.body.title,
    postt:req.body.postt,
    author:req.body.author,
    imageURL:req.body.imageURL,
    date:req.body.date}
   ,{new:true});
 res.send(post);
})

router.delete('/:id',role,async(req,res)=>{
 const post= await Post.findByIdAndRemove(req.params.id);
 res.send(post);
})
module.exports=router