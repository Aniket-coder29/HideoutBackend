const Post = require('../models/post');
const router = require('express').Router();

router.get('/post',async(req,res,next)=>{
    if(res.locals.user){
        try{
            const posts = await Post.findById(user.uid);
            res.status(200).json(posts);

        }catch(error){
            res.status(500).json(error);
        }
        
    }
    else{
        //redirect to login
    }
})

router.post('/post',async(req,res)=>{
    if(res.locals.user){
        const newPost = new Post(req.body);
        try{
            const savePost = await newPost.save();
            res.status(200).json({
                'success' : "Successfully posted"
            })
        }
        catch(error){

        }
    }
})