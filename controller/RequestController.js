const Friend = require('../models/friend');
const Request = require('../models/request')
const {deleteRequest,addFriend, addRequest} = require('../services/friendServices')

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
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
}

const makeFriendRequest = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        if(!friendId){
            res.status(500).json({"error" : "no friend id found"});
        }
        const addReq = await addRequest(user.uid,friendId)
        res.status(200).json({"Status" : "Success"})
    }
    else{
        //redirect to login
        res.status(404).json({
            "User" : 'Not logged in',
        })
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
        res.status(404).json({
            "User" : 'Not logged in',
        })
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
        const add1 = await addFriend(user.uid,friendId)
        if(!add1){
            res.status(200).json(err)
        }
        const add2 = await addFriend(friendId,user.uid)
        if(!add2){
            res.status(200).json(err)
        }
        const del= await deleteRequest(user.uid,friendId)
        if(!del){
            res.status(200).json(err)
        }
        res.status(200).json({"Status":"Success"})
    }
    else{
        //redirect to login
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

const rejectFriendRequest = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        const del= await deleteRequest(user.uid,friendId)
        if(!del){
            res.status(200).json(err)
        }
        res.status(200).json({"Status":"Success"})
    }
    else{
        //redirect to login
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

module.exports = {makeFriendRequest,deleteFriendRequest,acceptFriendRequest,getAllRequests,rejectFriendRequest};