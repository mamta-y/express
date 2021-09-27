

const { User ,validateUser} = require('../models/user-model');

function checking(req,res,next){
const  role=  User.findOne({ role: req.body.role });
   if(role!=='admin')
       return res.status(401).send('only admin can access this...');
     next();
    
}
    module.exports=checking;