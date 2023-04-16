const notifications = require("../models/notification")
const { getFriends } = require("./friendServices")

const addNotification = async (filter, data) => {
    try {
        const findUser = await notifications.findOne(filter).clone().exec()
        if (!findUser) {
            const newUser = new notifications(filter)
            const save = await newUser.save()
            // console.log(save)
        }
        const update = await notifications.findOneAndUpdate(filter, { $push: { notifications: data } }).clone().exec()
        // console.log(update)
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

const receivedReq = async (sender, receiver) => {
    const filter = { uid: receiver }
    const data = {
        action: 1,
        uid: sender
    }
    try {
        const sendNotification = await addNotification(filter, data)
        return sendNotification
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }

}

const acceptReq = async (accepter, requester) => {
    const filter = { uid: requester }
    const data = {
        action: 2,
        uid: accepter
    }
    try {
        const sendNotification = await addNotification(filter, data)
        return sendNotification
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const friendPosted = async (poster, postid) => {
    const data = {
        action: 3,
        uid: poster,
        postUid: poster,
        postid: postid
    }
    try {
        const friends = await getFriends(poster)
        if (friends.status && friends.data) {
            for (let i of friends.data.friends) {
                const filter = { uid: i }
                const notify = await addNotification(filter, data)
            }
        }
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

const postLiked = async (poster, postid, liker) => {
    const data = {
        action: 4,
        uid: liker,
        postUid: poster,
        postid: postid
    }
    const filter = { uid: poster }
    try {
        const sendNotification = await addNotification(filter, data)
        return sendNotification
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const postCommented = async (poster, postid, commenter) => {
    const data = {
        action: 5,
        uid: commenter,
        postUid: poster,
        postid: postid
    }
    const filter = { uid: poster }
    try {
        const sendNotification = await addNotification(filter, data)
        return sendNotification
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const replyOnCommentInPost = async (poster, postid, commenter, replier) => {
    const data1 = {
        action: 6.1,
        uid: replier,
        postUid: poster,
        postid: postid
    }
    const data2 = {
        action: 6.2,
        uid: replier,
        postUid: poster,
        postid: postid
    }
    const filter1 = { uid: poster }
    const filter2 = { uid: commenter }
    try {
        const sendNotification1 = await addNotification(filter1, data1)
        const sendNotification2 = await addNotification(filter2, data2)
        return { status: sendNotification1.status && sendNotification2.status }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

module.exports = { addNotification, receivedReq, acceptReq, friendPosted, postLiked, postCommented, replyOnCommentInPost }