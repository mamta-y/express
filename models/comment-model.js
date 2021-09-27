const mongoose = require('mongoose');
const Joi = require('joi');
const express=require('express');

const router = express.Router();
const Comment = mongoose.model('Comment', new mongoose.Schema({
   id:{
    type:String
   },
    coment:{
        type:String,
        minlength:5,
        maxlength:200,
        required:true
    }
}))
function validateComments(comment){
    const schema = Joi.object({
       coment:Joi.string().required().min(5).max(50),
       id:Joi.string()
       
    });
    return schema.validate(comment);
};
module.exports.Comment=Comment;
module.exports.validateComments=validateComments;