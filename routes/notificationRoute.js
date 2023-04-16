const router = require('express').Router();

const { getNotificationData, getNotificationOfUser, seeNotification } = require('../controller/NotificationController');


router.get('/allNotificationData', getNotificationData)

router.get('/getNotificationsOfUser', getNotificationOfUser)

router.get('/seeNotification', seeNotification)

module.exports = router;