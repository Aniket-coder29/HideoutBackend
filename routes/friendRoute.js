const router = require('express').Router();
const { getAllFriends, removeFriend, getCountOfFriends } = require('../controller/FriendController');
const {makeFriendRequest, deleteFriendRequest, acceptFriendRequest, getAllRequests} = require('../controller/RequestController')

router.post('/makeFriendReq',makeFriendRequest);

router.delete('/deleteFriendReq',deleteFriendRequest);

router.post('/acceptFriendReq',acceptFriendRequest);

router.get('/getAllReq',getAllRequests);

router.get('/getAllFriends',getAllFriends);

router.post('/removeFriend',removeFriend)

router.get('/countFriends',getCountOfFriends);


module.exports = router;