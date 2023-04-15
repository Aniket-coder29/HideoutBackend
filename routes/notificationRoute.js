const router = require('express').Router();

const { getNotificationData, getNotificationOfUser } = require('../controller/NotificationController');


router.get('/allNotificationData', getNotificationData)

router.get('/getNotificationsOfUser', getNotificationOfUser)

module.exports = router;