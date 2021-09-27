
const mongoose = require('mongoose');
const { Comment,validateComments}=require('../models/comment-model');
//const posts=require('../models/posts-model');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const result = validateComments(req.body); 
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
    let comment = new Comment({
        id:req.body.id,
        coment:req.body.coment
    })
     comment= await comment.save();
    res.send(comment);
});

module.exports = router;