const { route } = require('..');
const User = require('../models/user');

const router = require('express').Router();

router.get('/getUserDetails',async(req,res)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
            const userDetails = User.find({uid: user.uid});
            res.status(200).json(userDetails);

        }catch(error){
            res.status(500).json(error);
        }
    }
    else{
        //redirect to login
    }
});



router.post('/create',async(req,res)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
            const newUser = {
                name: user.name,
                photo: user.picture,
                email: user.email,
                uid: user.uid,
            }
            const newuserSave= new User(newUser);
            const saveUser= await newuserSave.save();
            res.status(200).json({
                status: 'User saved successfully',
                User : saveUser,
            })
        }
        catch(error){
            res.status(500).json(error);
        }
    }
})

router.get('/checkuser',async(req,res)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const email = user.email;
        const findEmail = await User.find({email: email});

        if(findEmail.length>0){
            res.status(200).json({
                User : 1,
                //1 means already exists, 0 means new user
            })
        }
        else{
            res.status(200).json({
                User : 0,
                //1 means already exists, 0 means new user
            })
        }
    }
    else{
        //redirect to login
    }
})

module.exports = router;