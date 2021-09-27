const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User ,validateUser} = require('../models/user-model');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const result = validateCred(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
    // const {role}=req.user;
    // if(role!=='admin'){
    //     return res.status(401).send('only admin can access this...');
    // }
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('user doesnot exist, please register.....') 
    
    
    const validpswd=await bcrypt.compare(req.body.password,user.password) 
    if(!validpswd) return res.status(400).send('invalid email password');
   
//   const  role= await User.findOne({ role: req.body.role });
//     if(role!=='admin'){
//        return res.status(401).send('only admin can access this...');
//     }
  const token= jwt.sign({_id:user._id},'Secretkey');
    res.send(token);
    });
function validateCred(user){
    const schema = Joi.object({
       email:Joi.string().required().min(5).max(50).email(),
       password:Joi.string().required().min(5).max(50)
       
    });
    return schema.validate(user);
} 
module.exports = router;