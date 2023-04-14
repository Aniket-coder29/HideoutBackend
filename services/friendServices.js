const Friend = require('../models/friend');
const Request = require('../models/request');
const { getMinDetails } = require('./userServices');

const checkSentRequest = async (id, friendId) => {
    const filter = { uid: id };
    try {
        const check = await Request.findOne(filter).clone().exec();
        if (check) {
            for (let i of check.sentRequests) {
                if (i === friendId) {
                    return {
                        status: 1,
                        data: true
                    }
                }
            }
        }
        return {
            status: 1,
            data: false
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const checkRecievedRequest = async (id, friendId) => {
    const filter = { uid: id };
    try {
        const check = await Request.findOne(filter).clone().exec();
        if (check) {
            for (let i of check.requests) {
                if (i === friendId) {
                    return {
                        status: 1,
                        data: true
                    }
                }
            }
        }
        return {
            status: 1,
            data: false
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
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
    try {
        const user = await Friend.findOne(filter).clone().exec()
        console.log(user)
        if (!user) {
            const newFriend = new Friend(filter);
            const save = await newFriend.save();
            console.log(save)
        }
        const friendAdd = await Friend.findOneAndUpdate(filter, { $addToSet: { friends: friendId } }).clone().exec()
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
    const filter1 = { uid: id }, filter2 = { uid: friendId }
    try {
        const finduser1 = await Friend.findOne(filter1).clone().exec();
        if (!finduser1) {
            const newFriend = new Friend(filter);
            const save = await newFriend.save();
            console.log(save)
        }
        const update1 = await Friend.findOneAndUpdate(filter1, { $pull: { friends: friendId } }).clone().exec()
        console.log(update1)
        const finduser2 = await Friend.findOne(filter2).clone().exec();
        if (!finduser2) {
            const newFriend = new Friend(filter2);
            const save = await newFriend.save();
            console.log(save)
        }
        const update2 = await Friend.findOneAndUpdate(filter2, { $pull: { friends: id } }).clone().exec()
        console.log(update2)
        return {
            status: 1,
            data: "Successfully deleted"
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }

}

const checkFriends = async (id, friendId) => {
    const filter = { uid: id };
    try {
        const check = await Friend.findOne(filter).clone().exec();
        if (check) {
            for (let i of check.friends) {
                if (i === friendId) {
                    return {
                        status: 1,
                        data: true
                    }
                }
            }
        }
        return {
            status: 1,
            data: false
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
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
module.exports = { addRequest, deleteRequest, addFriend, deleteFriend, checkFriends, checkSentRequest, checkRecievedRequest, countFriends, getFriends }