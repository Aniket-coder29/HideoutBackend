const notifications = require("../models/notification");

const getNotificationData = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        try {
            const data = notifications.find({}).clone().exec();
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
            const data = notifications.findOne(filter).clone().exec();
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

module.exports = { getNotificationData, getNotificationOfUser }