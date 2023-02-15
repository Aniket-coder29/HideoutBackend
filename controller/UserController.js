const User = require('../models/user');

const router = require('express').Router();

router.get('/getUserDetails',async(req,res)=>{
    if(res.locals.user){
        try{
            const user = User.findById(user.uid);
            res.status(200).json(user);

        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        //redirect to login
    }
});