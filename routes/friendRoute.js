const router = require('express').Router();
const { getAllFriends, removeFriend, getCountOfFriends, possibleConnections } = require('../controller/FriendController');
const {makeFriendRequest, deleteFriendRequest, acceptFriendRequest, getAllRequests, rejectFriendRequest} = require('../controller/RequestController')

router.post('/makeFriendReq',makeFriendRequest);

router.delete('/deleteFriendReq',deleteFriendRequest);

router.post('/acceptFriendReq',acceptFriendRequest);

router.get('/getAllReq',getAllRequests);

router.get('/getAllFriends',getAllFriends);

router.post('/removeFriend',removeFriend)

router.get('/countFriends',getCountOfFriends);

router.get('/rejectFriendRequest',rejectFriendRequest)

router.get('/findfriends',possibleConnections)


module.exports = router;