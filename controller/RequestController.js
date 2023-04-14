const Friend = require('../models/friend');
const Request = require('../models/request')
const { deleteRequest, addFriend, addRequest } = require('../services/friendServices')

const getAllSentRequests = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const filter = { uid: user.uid };
        try {
            const findUser = await Request.findOne(filter).clone().exec()
            if (findUser) {
                console.log(findUser)
                res.status(200).json(findUser.sentRequests)
            }
            else {
                console.log("no request ever")
                res.status(200).json([])
            }
        } catch (error) {
            res.status(500).json(error)
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

const getAllRequests = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const filter = { uid: user.uid };
        try {
            const findUser = await Request.findOne(filter).clone().exec()
            if (findUser) {
                console.log(findUser)
                res.status(200).json(findUser.requests)
            }
            else {
                console.log("no request ever")
                res.status(200).json([])
            }
        } catch (error) {
            res.status(500).json(error)
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

const makeFriendRequest = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const friendId = req.query.uid;
        if (!friendId) {
            res.status(500).json({ "error": "no friend id found" });
        }
        const addReq = await addRequest(user.uid, friendId)
        res.status(200).json({ "Status": "Success" })
    }
    else {
        //redirect to login
        res.status(404).json({
            "User": 'Not logged in',
        })
    }
};

const deleteFriendRequest = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const friendId = req.query.uid;
        if (!friendId) {
            return;
        }
        const del = await deleteRequest(user.uid, friendId)
        if (del.status)
            res.status(200).json({ Status: "Successfully Deleted" })
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
};

const acceptFriendRequest = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const friendId = req.query.uid;
        if (!friendId) {
            return res.status(500).json({ "error": "no uid passed" });
        }
        const add1 = await addFriend(user.uid, friendId)
        if (add1.status === 0) {
            res.status(500).json(add1.error)
        }
        console.log(add1)
        const add2 = await addFriend(friendId, user.uid)
        if (add2.status === 0) {
            res.status(500).json(add2.error)
        }
        console.log(add2)
        const del = await deleteRequest(friendId, user.uid)
        if (!del) {
            res.status(500).json(err)
        }
        res.status(200).json({ "Status": "Success" })
    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
};

const rejectFriendRequest = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const friendId = req.query.uid;
        const del = await deleteRequest(friendId, user.uid)
        if (del.status)
            res.status(200).json({ Status: "Successfully Deleted" })
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
};

const AllRequests = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            const requests = await Request.find({}).clone().exec();
            res.status(200).json(requests);
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

module.exports = { makeFriendRequest, deleteFriendRequest, acceptFriendRequest, getAllRequests, rejectFriendRequest, getAllSentRequests, AllRequests };