const router = require('express').Router();
const { getAllFriends, removeFriend, getCountOfFriends, possibleConnections, checkFriend, allFriendsData, searchPossibleConnections } = require('../controller/FriendController');
const { makeFriendRequest, deleteFriendRequest, acceptFriendRequest, getAllRequests, rejectFriendRequest, getAllSentRequests, AllRequests, countAllSentReqs, countAllRequests } = require('../controller/RequestController')

router.get('/makeFriendReq', makeFriendRequest);

router.get('/deleteFriendReq', deleteFriendRequest);

router.get('/acceptFriendReq', acceptFriendRequest);

router.get('/getAllReq', getAllRequests);

router.get('/countAllRequests', countAllRequests)

router.get('/getAllFriends', getAllFriends);

router.get('/removeFriend', removeFriend)

router.get('/countFriends', getCountOfFriends);

router.get('/rejectFriendRequest', rejectFriendRequest)

router.get('/findfriends', possibleConnections)

router.get('/getAllSentRequests', getAllSentRequests)

router.get('/countAllSentRequests', countAllSentReqs)

router.get('/checkFriend', checkFriend)

router.get('/getAllFriendsData', allFriendsData)

router.get('/getAllRequestData', AllRequests)

router.get('/searchInFindFriends', searchPossibleConnections)

module.exports = router;