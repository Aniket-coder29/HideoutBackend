const friend = require("../models/friend");
const User = require('../models/user');
const Request = require('../models/request')
const { countFriends, getFriends } = require("../services/friendServices");
const { getMinDetails } = require("../services/userServices");


const getAllFriends = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        if (!uid)
            return res.status(500).json({ "error": "no uid passed" });
        // const filter = { uid: uid }
        // const getFriends = friend.find(filter, async (err, docs) => {
        //     if (err) {
        //         // console.log(err)
        //         res.status(200).json(err)
        //     }
        //     else {
        //         // console.log(docs)
        //         res.status(200).json(docs)
        //     }
        // })
        const getFriend = await getFriends(uid)
        if(getFriend.status){
            res.status(200).json(getFriend.data.friends)
        }
        else{
            res.status(500).json(getFriend.error)
        }
    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const removeFriend = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const friendId = req.query.uid;
        if (!friendId) {
            return;
        }
        const filter1 = { uid: friendId }, filter2 = { uid: user.uid }
        const findUser1 = friend.findOne(filter1, async (err, docs) => {
            if (err) {
                // console.log(err)
                res.status(200).json(err)
            }
            else {
                if (!docs) {
                    return;
                }
                friend.findOneAndUpdate(filter1, { $pullAll: { friends: [user.uid] } }, async (err, docs) => {
                    if (err) {
                        // console.log(err)
                        res.status(200).json(err)
                    }
                    else {
                        // console.log(docs)
                        res.status(200).json(docs)
                    }
                })
            }
        })
        const findUser2 = friend.findOne(filter2, async (err, docs) => {
            if (err) {
                // console.log(err)
                res.status(200).json(err)
            }
            else {
                if (!docs) {
                    return;
                }
                friend.findOneAndUpdate(filter2, { $pullAll: { friends: [friendId] } }, async (err, docs) => {
                    if (err) {
                        // console.log(err)
                        res.status(200).json(err)
                    }
                    else {
                        // console.log(docs)
                        res.status(200).json(docs)
                    }
                })
            }
        })
    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getCountOfFriends = async (req, res, next) => {
    if(res.locals.user){
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        if (!uid)
            return res.status(500).json({ "error": "no uid passed" });
        const count = await countFriends(uid)
        console.log(count)
        if(count.status){
            res.status(200).json({
                // count: count.docs.friends.size()
                count: count.count
            })
        }
        else{
            res.status(500).json({
                error: "Not able to connect to source"
            })
        }
    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const possibleConnections = async(req,res)=>{
    if(res.locals.user){
        const user = res.locals.user
        try{
            const allUsers = await User.find({},"uid").clone().exec();
            console.log(allUsers)
            const friends = await friend.findOne({uid:user.uid},"friends").clone().exec();
            console.log(friends)
            const reqUsers = await Request.findOne({uid:user.uid},"sentRequests").clone().exec();
            console.log(reqUsers)
            let ids = new Set()
            ids.add(user.uid)
            let ans = []
            for(let i of reqUsers.sentRequests){
                ids.add(i)
            }
            for(let i of friends.friends){
                ids.add(i.uid)
            }
            for(let i of allUsers){
                let iniSize = ids.size
                ids.add(i.uid)
                let newSize = ids.size
                if(newSize>iniSize){
                    ans.push(i.uid)
                }
            }
            let ans1 = []
            for(let i of ans){
                const details = await getMinDetails(i)
                ans1.push(details.data)
            }
            res.status(200).json(ans1)
        }catch(error){
            res.status(500).json({error:error})
        }
    }else{
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
    
}

module.exports = { getAllFriends, removeFriend, getCountOfFriends, possibleConnections }