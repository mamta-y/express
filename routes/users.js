const lodash = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User,validateUser } = require('../models/user-model');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const result = validateUser(req.body); //this is for validating what user enters
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('email already exist')
   
    user = new User(lodash.pick(req.body, ["name", "email", "password","phone","role"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();
    res.send(lodash.pick(user, ["name", "email", "_id","phone"]));
    
});
module.exports = router;