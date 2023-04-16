const friend = require("../models/friend");
const User = require('../models/user');
const Request = require('../models/request')
const { countFriends, getFriends, deleteFriend, checkFriends, findFriends } = require("../services/friendServices");
const { getMinDetails, searchUsers } = require("../services/userServices");

const checkFriend = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user
        const friendId = req.query.id
        const check = await checkFriends(user.uid, friendId)
        if (check.status) {
            return res.status(200).json(check.data)
        }
        else {
            return res.status(500).json(check.error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getAllFriends = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        if (!uid)
            return res.status(500).json({ "error": "no uid passed" });
        const getFriend = await getFriends(uid)
        if (getFriend.status) {
            if (getFriend.data) {
                let friends = []
                for (let i of getFriend.data.friends) {
                    const detail = await getMinDetails(i)
                    if (detail.status) {
                        friends.push(detail.data)
                    }
                }
                return res.status(200).json(friends)
            }
            else {
                return res.status(200).json([]);
            }
        }
        else {
            return res.status(500).json(getFriend.error)
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
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
        const del = await deleteFriend(user.uid, friendId);
        // console.log(del)
        if (del.status) {
            return res.status(200).json(del.data)
        }
        else {
            return res.status(500).json(del.error)
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getCountOfFriends = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        if (!uid)
            return res.status(500).json({ "error": "no uid passed" });
        const count = await countFriends(uid)
        // console.log(count)
        if (count.status) {
            return res.status(200).json(count.data)
        }
        else {
            return res.status(500).json({
                error: "Not able to connect to source"
            })
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const possibleConnections = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        try {
            const ans = await findFriends(user.uid)
            if(!ans.status){
                return res.status(500).json({ error: ans.error })
            }
            // console.log(ans)
            let ans1 = []
            for (let i of ans.data) {
                const details = await getMinDetails(i)
                if(details.status)
                ans1.push(details.data)
            }
            return res.status(200).json(ans1)
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }

}

const searchPossibleConnections = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const name = req.query.name
        try {
            const ids = await findFriends(user.uid)
            if(!ids.status){
                res.status(500).json(ids.error)
            }
            const idss = await searchUsers(name)
            if(!idss.status){
                res.status(500).json(idss.error)
            }
            let ret = []
            for(let i of ids.data){
                const oldsz = idss.data.size
                idss.data.add(i)
                const newsz = idss.data.size
                if(newsz===oldsz){
                    ret.push(i)
                }
            }
            let ans = []
            for(let i of ret){
                const detail = await getMinDetails(i)
            if(detail.status)
                ans.push(detail.data)
            }
            return res.status(200).json(ans)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const allFriendsData = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            const friends = await friend.find({}).clone().exec();
            return res.status(200).json(friends);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

module.exports = { getAllFriends, removeFriend, getCountOfFriends, possibleConnections, checkFriend, allFriendsData, searchPossibleConnections }