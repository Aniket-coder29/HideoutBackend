const router = require('express').Router();
const {makeFriendRequest, deleteFriendRequest, acceptFriendRequest, getAllRequests} = require('../controller/FriendController')

router.post('/makeFriendReq',makeFriendRequest);

router.delete('/deleteFriendReq',deleteFriendRequest);

router.post('/acceptFriendReq',acceptFriendRequest);

router.get('/getAllReq',getAllRequests);



module.exports = router;