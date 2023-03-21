const Post = require('../models/post');
const Friend = require('../models/friend');
const router = require('express').Router();

router.get('/post',async(req,res,next)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
            const allfriends = await Friend.find({userid: user.uid},(err,docs)=>{
                if(err){
                    console.log(err)
                    res.status(500).json(err);
                }
                else{
                    res.status(200).json(docs);
                }
            });
            const allIds=[];
            // allIds.push(user.uid);
            const friends= allfriends.friends;
            // foreach(allfriends.friends as yaar){
            //     allIds.push(yaar.uid);
            // }
            const posts = await Post.find({userid: user.uid});
            res.status(200).json(posts);

        }catch(error){
            res.status(500).json(error);
        }
        
    }
    else{
        //redirect to login
    }
})

router.get('/mypost',async(req,res,next)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
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
            res.status(500).json(error);
        }
    }
    else{
        //redirect to login
    }
})