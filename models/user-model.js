const mongoose=require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User',new mongoose.Schema({
    name:{                     
        type:String,
        required:true,
        minlength:5,
        maxlength:15,
        trim:true
    } ,
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true 
    },
password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:250 
},
phone:{
    type:Number,
      required:true,
      validate: {
        validator:function(v){
       return  v.length=10;
    },
    message:'length of phone number should be 10'
}
},
role:{
    type:String,required:true,
    enum:['admin','user']
}
}));

function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(15).required().trim(),
       email:Joi.string().required().min(5).max(50).email(),
       password:Joi.string().required().min(5).max(50),
phone:Joi.string().required().length(10),
role:Joi.string().valid('admin','user').required()
    });
    return schema.validate(user);
} 
module.exports.User= User; 
module.exports.validateUser= validateUser; 