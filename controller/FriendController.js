const friend = require("../models/friend");
const User = require('../models/user');
const Request = require('../models/request')
const { countFriends, getFriends, deleteFriend, checkFriends } = require("../services/friendServices");
const { getMinDetails } = require("../services/userServices");

const checkFriend = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user
        const friendId = req.query.id
        const check = await checkFriends(user.uid, friendId)
        if (check.status) {
            res.status(200).json(check.data)
        }
        else {
            res.status(500).json(check.error)
        }
    } else {
        //redirect to login
        res.status(404).json({
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
                res.status(200).json(friends)
            }
            else {
                res.status(200).json([]);
            }
        }
        else {
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
        const del = await deleteFriend(user.uid, friendId);
        console.log(del)
        if (del.status) {
            res.status(200).json(del.data)
        }
        else {
            res.status(500).json(del.error)
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

const getCountOfFriends = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        if (!uid)
            return res.status(500).json({ "error": "no uid passed" });
        const count = await countFriends(uid)
        // console.log(count)
        if (count.status) {
            res.status(200).json(count.data)
        }
        else {
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

const possibleConnections = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        try {
            const allUsers = await User.find({}, "uid").clone().exec();
            console.log(allUsers)
            const friends = await friend.findOne({ uid: user.uid }, "friends").clone().exec();
            console.log(friends)
            const reqUsers = await Request.findOne({ uid: user.uid }, "sentRequests").clone().exec();
            const reqsUsers = await Request.findOne({ uid: user.uid }, "requests").clone().exec();
            console.log(reqUsers)
            let ids = new Set()
            ids.add(user.uid)
            let ans = []
            if (reqUsers) {
                for (let i of reqUsers.sentRequests) {
                    ids.add(i)
                }
            }
            if(reqsUsers){
                for (let i of reqUsers.requests) {
                    ids.add(i)
                }
            }
            if (friends) {
                for (let i of friends.friends) {
                    ids.add(i)
                }
            }
            for (let i of allUsers) {
                let iniSize = ids.size
                ids.add(i.uid)
                let newSize = ids.size
                if (newSize > iniSize) {
                    ans.push(i.uid)
                }
            }
            let ans1 = []
            for (let i of ans) {
                const details = await getMinDetails(i)
                ans1.push(details.data)
            }
            res.status(200).json(ans1)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    } else {
        //redirect to login
        res.status(404).json({
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
            res.status(200).json(friends);
        } catch (error) {
            return res.status(500).json(error);
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

module.exports = { getAllFriends, removeFriend, getCountOfFriends, possibleConnections, checkFriend, allFriendsData }