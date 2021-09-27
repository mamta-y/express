require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('joi');
const posts=require('./routes/posts');
const comments= require('./routes/comments');
const users = require('./routes/users');
const login = require('./routes/login');
const express=require('express');
const app = express();
mongoose.connect("mongodb://localhost/post")
.then(()=> console.log('connected to post db'))
.catch( err => console.log('could not connect to db',err))


app.use(express.json()); 
 //app.use(express.urlencoded( {extended:true})); 
 app.use('/api/posts',posts);
 app.use('/api/comments',comments);
 app.use('/api/users',users);
 app.use('/api/login',login);
const port=process.env.PORT || 4000
app.listen(port,()=> console.log(`listening to ${port}`));