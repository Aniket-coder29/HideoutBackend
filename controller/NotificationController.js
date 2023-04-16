const { Types } = require("mongoose");
const notifications = require("../models/notification");

const getNotificationData = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        try {
            const data = await notifications.find({}).clone().exec();
            console.log(data)
            return res.status(200).json(data)
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

const getNotificationOfUser = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid }
        try {
            const data = await notifications.findOne(filter).clone().exec();
            console.log(data)
            return res.status(200).json(data)
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

const seeNotification = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const uid = req.query.uid ? req.query.uid : user.uid
        const notificationid = req.query.notificationId
        const filter = { uid: uid }
        try {
            const data = await notifications.findOneAndUpdate({uid:uid,notifications:{$elemMatch:{_id:notificationid}}},{$set:{'notifications.$.seen':true}}).clone().exec();
            // console.log(data)
            return res.status(200).json("Seen Notification")
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

module.exports = { getNotificationData, getNotificationOfUser, seeNotification }