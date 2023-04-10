const Friend = require('../models/friend');
const Request = require('../models/request');
const { getDetails } = require('./userServices');

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
    const filter = { uid: friendId };
    const findUser = Request.findOne(filter, async (err, docs) => {
        if (err) {
            // console.log(err)
            // console.log("first error")
            // res.status(200).json(err)
            return false
            return { "Error": err }
        }
        else {
            if (!docs) {
                // console.log("new entry started")
                const newReq = new Request(filter);
                const save = await newReq.save();
                // console.log("new entry made")
                // console.log(save)
            }
            Request.findOneAndUpdate(filter, { $addToSet: { requests: id } }, async (err, docs) => {
                if (err) {
                    // console.log(err)
                    return { "Error": err }
                    return false
                }
                else {
                    // console.log(docs)
                    return { "Success": docs }
                    return true
                }
            }).clone()
        }
    }).clone()
}

const deleteRequest = async (id, friendId) => {
    const filter = { uid: id }
    const deleteReq = await Request.findOneAndUpdate(filter, { $pullAll: { requests: [friendId] } }, async (err, docs) => {
        if (err) {
            // console.log(err)
            return { "Error": err }
            return false
        }
        else {
            // console.log(docs)
            return { "Success": docs }
            return true
        }
    }).clone()
    return true;
}

const addFriend = async (id, friendId) => {
    const filter = { uid: id }
    await Friend.findOne(filter, async (err, docs) => {
        if (err) {
            console.log(err)
            return false
        }
        else {
            console.log(docs)
            if (!docs) {
                const newFriend = new Friend(filter);
                const save = await newFriend.save();
                console.log("new entry made")
                console.log(save)
            }
            const friendDetails = await getDetails(friendId);
            await Friend.findOneAndUpdate(filter, { $addToSet: { friends: friendDetails } }, async (err, docs) => {
                if (err) {
                    console.log(err)
                    return false
                }
                else {
                    console.log(docs)
                    // res.status(200).json(docs)
                }
            }).clone()
        }
    }).clone()
    return true
}

const deleteFriend = async (id, friendId) => {
    const filter = { uid: id }
    await Friend.findOne(filter, async (err, docs) => {
        if (err) {
            console.log(err)
            return false
        }
        else {
            console.log(docs)
            if (!docs) {
                const newFriend = new Friend(filter);
                const save = newFriend.save();
                console.log("new entry made")
                console.log(save)
            }
            await Friend.findOneAndUpdate(filter, { $pullAll: { friends: [friendId] } }, async (err, docs) => {
                if (err) {
                    console.log(err)
                    return false
                }
                else {
                    console.log(docs)
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
module.exports = { addRequest, deleteRequest, addFriend, deleteFriend, checkFriend, checkSentRequest, checkRecievedRequest }