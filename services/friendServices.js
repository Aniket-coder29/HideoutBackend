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
            await Request.findOneAndUpdate(filter, { $addToSet: { requests: id } }, async (err, docs) => {
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
    console.log(id, "adding", friendId);
    const friendDetails = await getMinDetails(friendId)
    console.log(friendDetails)
    // let retval = {}
    // if (friendDetails.status) {
    //     retval = { uid: friendDetails.data.uid, photo: friendDetails.data.photo || "", name: friendDetails.data.name || "", designation: friendDetails.data.designation || "" }
    // }
    // await Friend.findOne(filter, (err, docs) => {
    //     if (err) {
    //         // console.log(err)
    //         // return false
    //         retval = {
    //             status:0,
    //             error: err
    //         }
    //     }
    //     else {
    //         // console.log(docs)
    //         if (!docs) {
    //             const newFriend = new Friend(filter);
    //             const save = newFriend.save();
    //             // console.log("new entry made")
    //             // console.log(save)
    //         }
    //         Friend.findOneAndUpdate(filter, { $addToSet: { friends: retval } }, async (err, docs) => {
    //             if (err) {
    //                 // console.log(err)
    //                 retval = {
    //                     status: 0,
    //                     error: err
    //                 }
    //             }
    //             else {
    //                 // console.log(docs)
    //                 // res.status(200).json(docs)
    //                 retval = {
    //                     status:1,
    //                 }
    //             }
    //         }).clone()
    //     }
    // }).clone()
    try {
        const user = await Friend.findOne(filter).clone().exec()
        console.log(user)
        if(!user){
            const newFriend = new Friend(filter);
            const save = await newFriend.save();
            console.log(save)
        }
        console.log(friendDetails.data)
        const friendAdd = await Friend.findOneAndUpdate(filter,{ $addToSet: { friends: friendDetails.data } }).clone().exec()
        console.log(friendAdd)
        if(!friendAdd){
            return {
                status: 0,
                error: "Timeout error due to network issue"
            }
        }
        return {
            status:1
        }
    } catch (err) {
        return {
            status:0,
            error: err
        }
    }
    

    // // console.log(retval)
    // return friendAdd
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
    let retval = {}
    await Friend.findOne(filter, (err, docs) => {
        if (err) {
            console.log(err)
            retval =  {
                status: 0,
                error: err
            }
        }
        else {
            console.log(docs)
            retval = {
                status: 1,
                count: docs
            }
        }
    }).clone()
    return retval
}
module.exports = { addRequest, deleteRequest, addFriend, deleteFriend, checkFriend, checkSentRequest, checkRecievedRequest, countFriends }