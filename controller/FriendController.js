const friend = require("../models/friend");


const getAllFriends = async(req,res,next)=>{
    if(res.locals.user){
        const uid=req.query.uid;
        if(!uid)
            return res.status(500).json({"error" : "no uid passed"});
        const filter = {uid:uid}
        const getFriends = friend.find(filter,async(err,docs)=> {
            if(err){
                console.log(err)
                res.status(200).json(err)
            }
            else{
                console.log(docs)
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

const removeFriend = async(req,res,next)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const friendId = req.query.uid;
        if(!friendId){
            return;
        }
        const filter1 = {uid:friendId},filter2= {uid:user.uid}
        const findUser1 = friend.findOne(filter1, async(err,docs)=> {
            if(err){
                // console.log(err)
                res.status(200).json(err)
            }
            else{
                if(!docs){ 
                    return;
                }
                friend.findOneAndUpdate(filter1,{$pullAll:{friends:[user.uid]}},async(err,docs)=>{
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
        const findUser2 = friend.findOne(filter2, async(err,docs)=> {
            if(err){
                // console.log(err)
                res.status(200).json(err)
            }
            else{
                if(!docs){ 
                    return;
                }
                friend.findOneAndUpdate(filter2,{$pullAll:{friends:[friendId]}},async(err,docs)=>{
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
}

module.exports={getAllFriends,removeFriend}