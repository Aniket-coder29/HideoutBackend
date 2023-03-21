const Friend = require('../models/friend');
const Request = require('../models/request')
const router = require('express').Router();

const getAllRequests = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const filter = {uid:user.uid};
        const findUser = Request.find(filter, async(err,docs)=> {
            if(err){
                // console.log(err)
                res.status(200).json(err)
            }
            else{
                res.status(200).json(docs)
            }
        })
    }
    else{
        //redirect to login
    }
}

const makeFriendRequest = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        if(!friendId){
            return;
        }
        const filter = {uid:friendId};
        const findUser = Request.findOne(filter, async(err,docs)=> {
            if(err){
                // console.log(err)
                res.status(200).json(err)
            }
            else{
                if(!docs){ 
                    const newReq = new Request(filter);
                    const save = await newReq.save();
                    // console.log("new entry made")
                    // console.log(save)
                }
                Request.findOneAndUpdate(filter,{$addToSet:{requests:user.uid}},async(err,docs)=>{
                    if(err){
                        // console.log(err)
                        res.status(200).json(err)
                    }
                    else{
                        // console.log(docs)
                        res.status(200).json(docs)
                    }
                })
            }
        })
    }
    else{
        //redirect to login
    }
};

const deleteFriendRequest = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        if(!friendId){
            return;
        }
        const filter = {uid:friendId};
        const findUser = Request.findOne(filter, async(err,docs)=> {
            if(err){
                // console.log(err)
                res.status(200).json(err)
            }
            else{
                if(!docs){ 
                    return;
                }
                Request.findOneAndUpdate(filter,{$pullAll:{requests:[user.uid]}},async(err,docs)=>{
                    if(err){
                        console.log(err)
                        res.status(200).json(err)
                    }
                    else{
                        // console.log(docs)
                        res.status(200).json(docs)
                    }
                })
            }
        })
    }
    else{
        //redirect to login
    }
};

const acceptFriendRequest = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        const filter = {uid:user.uid};
        if(!friendId){
            return;
        }
        const deleteReq = Request.findOneAndUpdate(filter,{$pullAll:{requests:[friendId]}},async(err,docs)=>{
            if(err){
                console.log(err)
                res.status(200).json(err)
            }
            else{
                // console.log(docs)
                // res.status(200).json(docs)
                const findUser = Friend.findOne(filter, async(err,docs)=> {
                    if(err){
                        // console.log(err)
                        res.status(200).json(err)
                    }
                    else{
                        if(!docs){ 
                            const newFriend = new Friend(filter);
                            const save = newFriend.save();
                            // console.log("new entry made")
                            // console.log(save)
                        }
                        Friend.findOneAndUpdate(filter,{$addToSet:{friends:friendId}},async(err,docs)=>{
                            if(err){
                                // console.log(err)
                                res.status(200).json(err)
                            }
                            else{
                                console.log(docs)
                                // res.status(200).json(docs)                    
                                Friend.findOne({uid:friendId}, async(err,docs)=> {
                                    if(err){
                                        // console.log(err)
                                        res.status(200).json(err)
                                    }
                                    else{
                                        if(!docs){ 
                                            const newFriend = new Friend({uid:friendId});
                                            const save = newFriend.save();
                                            // console.log("new entry made")
                                            // console.log(save)
                                        }
                                        Friend.findOneAndUpdate({uid:friendId},{$addToSet:{friends:user.uid}},async(err,docs)=>{
                                            if(err){
                                                // console.log(err)
                                                res.status(200).json(err)
                                            }
                                            else{
                                                console.log(docs)
                                                res.status(200).json(docs)
                                            }
                                        })
                                    }
                                })   
                            }
                        })    
                    }  
                })
            }
        });
    }
    else{
        //redirect to login
    }
};

const rejectFriendRequest = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        if(!friendId){
            return;
        }
        const filter = {uid:user.uid};
        const findUser = Request.findOne(filter, async(err,docs)=> {
            if(err){
                // console.log(err)
                res.status(200).json(err)
            }
            else{
                if(!docs){ 
                    return;
                }
                Request.findOneAndUpdate(filter,{$pullAll:{requests:[friendId]}},async(err,docs)=>{
                    if(err){
                        console.log(err)
                        res.status(200).json(err)
                    }
                    else{
                        // console.log(docs)
                        res.status(200).json(docs)
                    }
                })
            }
        })
    }
    else{
        //redirect to login
    }
};

module.exports = {makeFriendRequest,deleteFriendRequest,acceptFriendRequest,getAllRequests,rejectFriendRequest};