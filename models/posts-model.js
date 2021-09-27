const mongoose = require('mongoose');
const Joi = require('joi');
const express=require('express');
const { date } = require('joi');
const router = express.Router();

 
const Post =  mongoose.model('Post', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:6,
        maxlength:15,
        trim:true
    },
    postt:{
        type:String,
        required:true,
        minlength:6,
        maxlength:50,
        trim:true
        

    },
    author:{
        type:String,
        required:true,
        minlength:6,
        maxlength:15,
        trim:true
    },
    imageURL:{
        type:String,

    },
    date:{
      type:Date,
      required:true,
      default:Date.now

    }
}))
function validatePost(post){
    const schema = Joi.object({
        title:Joi.string().required().min(6).max(15).trim(),
        postt:Joi.string().required().min(6).max(50).trim(),
        author:Joi.string().required().min(6).max(50).trim(),
        imageURL:Joi.string(),
        date:Joi.date()
    });
    return schema.validate(post);
}
module.exports.Post=Post;
module.exports.validatePost=validatePost;