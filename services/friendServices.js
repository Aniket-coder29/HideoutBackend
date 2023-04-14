const Friend = require('../models/friend');
const Request = require('../models/request');
const { getMinDetails } = require('./userServices');

const checkSentRequest = async (id, friendId) => {
    const filter = { uid: friendId };
    const check = await Request.find({ requests: { "$in": id } }, async (err, docs) => {
        if (err) {
            console.log(err)
            return false
        }
        else {
            console.log(docs)
            return true;
        }
    }).clone()
    return false
}

const checkRecievedRequest = async (id, friendId) => {
    const filter = { uid: id };
    const check = await Request.find({ requests: { "$in": friendId } }, async (err, docs) => {
        if (err) {
            console.log(err)
            return false
        }
        else {
            console.log(docs)
            return true;
        }
    }).clone()
    return false
}

const addRequest = async (id, friendId) => {
    const filter1 = { uid: friendId }
    const filter2 = { uid: id }
    try {
        const findUser1 = await Request.findOne(filter1).clone().exec()
        if (!findUser1) {
            const newReq = new Request(filter1);
            const save = await newReq.save();
            console.log(save)
        }
        const updateReq1 = await Request.findOneAndUpdate(filter1, { $addToSet: { requests: id } }).clone().exec()
        console.log(updateReq1)
        const findUser2 = await Request.findOne(filter2).clone().exec()
        if (!findUser2) {
            const newReq = new Request(filter2);
            const save = await newReq.save();
            console.log(save)
        }
        const updateReq2 = await Request.findOneAndUpdate(filter2, { $addToSet: { sentRequests: friendId } }).clone().exec()
        console.log(updateReq2)
        return {
            status: 1
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const deleteRequest = async (id, friendId) => {
    const filter1 = { uid: id }
    const filter2 = { uid: friendId }
    try {
        const deleteReq1 = await Request.findOneAndUpdate(filter1, { $pull: { sentRequests: friendId } }).clone().exec()
        const deleteReq = await Request.findOneAndUpdate(filter2, { $pull: { requests: id } }).clone().exec()
        return {
            status: 1
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
    return true;
}

const addFriend = async (id, friendId) => {
    const filter = { uid: id }
    console.log(id, "adding", friendId);
    const friendDetails = await getMinDetails(friendId)
    console.log(friendDetails)
    try {
        const user = await Friend.findOne(filter).clone().exec()
        console.log(user)
        if (!user) {
            const newFriend = new Friend(filter);
            const save = await newFriend.save();
            console.log(save)
        }
        console.log(friendDetails.data)
        const friendAdd = await Friend.findOneAndUpdate(filter, { $addToSet: { friends: friendDetails.data } }).clone().exec()
        console.log(friendAdd)
        if (!friendAdd) {
            return {
                status: 0,
                error: "Timeout error due to network issue"
            }
        }
        return {
            status: 1
        }
    } catch (err) {
        return {
            status: 0,
            error: err
        }
    }
}

const deleteFriend = async (id, friendId) => {
    const filter = { uid: id }
    await Friend.findOne(filter, async (err, docs) => {
        if (err) {
            // console.log(err)
            return false
        }
        else {
            // console.log(docs)
            if (!docs) {
                const newFriend = new Friend(filter);
                const save = newFriend.save();
                // console.log("new entry made")
                // console.log(save)
            }
            await Friend.findOneAndUpdate(filter, { $pullAll: { friends: [friendId] } }, async (err, docs) => {
                if (err) {
                    // console.log(err)
                    return false
                }
                else {
                    // console.log(docs)
                    // res.status(200).json(docs)
                }
            }).clone()
        }
    }).clone()
    return true
}

const checkFriend = async (id, friendId) => {
    const filter = { uid: id };
    const check = await Friend.find({ friends: { "$in": friendId } }, async (err, docs) => {
        if (err) {
            console.log(err)
            return false
        }
        else {
            console.log(docs)
            return true;
        }
    }).clone()
    return false
}

const countFriends = async (id) => {
    const filter = { uid: id }
    try {
        const friends = await Friend.findOne(filter, "friends").clone().exec();
        // console.log(friends.friends.length)
        console.log(friends)
        if (!friends) {
            return {
                status: 1,
                data: 0
            }
        }
        return {
            status: 1,
            data: friends.friends.length
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const getFriends = async (id) => {
    const filter = { uid: id }
    console.log("get Friends in friend services")
    try {
        const getFriend = await Friend.findOne(filter).clone().exec()
        console.log(getFriend)
        return {
            status: 1,
            data: getFriend
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}
module.exports = { addRequest, deleteRequest, addFriend, deleteFriend, checkFriend, checkSentRequest, checkRecievedRequest, countFriends, getFriends }