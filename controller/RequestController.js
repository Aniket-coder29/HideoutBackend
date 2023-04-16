const Friend = require('../models/friend');
const Request = require('../models/request')
const { deleteRequest, addFriend, addRequest } = require('../services/friendServices');
const { receivedReq, acceptReq } = require('../services/notificationServices');
const { getMinDetails } = require('../services/userServices');

const getAllSentRequests = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid };
        try {
            const findUser = await Request.findOne(filter).clone().exec()
            if (findUser) {
                // console.log(findUser)
                return res.status(200).json(findUser.sentRequests)
            }
            else {
                // console.log("no request ever")
                return res.status(200).json([])
            }
        } catch (error) {
            return res.status(500).json(error)
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

const countAllSentReqs = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid };
        try {
            const findUser = await Request.findOne(filter).clone().exec()
            if (findUser) {
                // console.log(findUser)
                return res.status(200).json(findUser.sentRequests.length)
            }
            else {
                // console.log("no request ever")
                return res.status(200).json(0)
            }
        } catch (error) {
            return res.status(500).json(error)
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

const getAllRequests = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid };
        try {
            const findUser = await Request.findOne(filter).clone().exec()
            if (findUser) {
                // console.log(findUser)
                let reqs = []
                for (let i of findUser.requests) {
                    const detail = await getMinDetails(i)
                    if (detail.status) {
                        reqs.push(detail.data)
                    }
                }
                return res.status(200).json(reqs)
            }
            else {
                // console.log("no request ever")
                return res.status(200).json([])
            }
        } catch (error) {
            return res.status(500).json(error)
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

const countAllRequests = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid };
        try {
            const findUser = await Request.findOne(filter).clone().exec()
            if (findUser) {
                // console.log(findUser)
                return res.status(200).json(findUser.requests.length)
            }
            else {
                // console.log("no request ever")
                return res.status(200).json(0)
            }
        } catch (error) {
            return res.status(500).json(error)
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

const makeFriendRequest = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const friendId = req.query.uid;
        if (!friendId) {
            return res.status(500).json({ "error": "no friend id found" });
        }
        const addReq = await addRequest(user.uid, friendId)
        const sendNotif = await receivedReq(user.uid, friendId)
        return res.status(200).json({ "Status": "Success" })
    }
    else {
        //redirect to login
        return res.status(404).json({
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
            return res.status(200).json({ Status: "Successfully Deleted" })
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
            return res.status(500).json(add1.error)
        }
        // console.log(add1)
        const add2 = await addFriend(friendId, user.uid)
        if (add2.status === 0) {
            return res.status(500).json(add2.error)
        }
        // console.log(add2)
        const del = await deleteRequest(friendId, user.uid)
        if (!del) {
            return res.status(500).json(err)
        }

        const sendNotif = await acceptReq(user.uid, friendId)

        return res.status(200).json({ "Status": "Success" })
    }
    else {
        //redirect to login
        return res.status(404).json({
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
            return res.status(200).json({ Status: "Successfully Deleted" })
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
};

const AllRequests = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            const requests = await Request.find({}).clone().exec();
            return res.status(200).json(requests);
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

module.exports = { makeFriendRequest, deleteFriendRequest, acceptFriendRequest, getAllRequests, rejectFriendRequest, getAllSentRequests, AllRequests, countAllRequests, countAllSentReqs };