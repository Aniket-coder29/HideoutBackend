const { getUserPost, getAllPosts, makePost, deletePost, addLike, addComment, deleteLike, deleteComment, AllPosts, addReply, allComments, deleteReply, countReplies, countComments, countLike, countPost, getAllCommentsOfPost, checkLike, getRepliesOfComment, addLikeToComment, deleteLikeFromComment, countLikeOfComment, checkLikeOfComment, addLikeToReply, deleteLikeFromReply, countLikeOfReply, checkLikeOfReply, getSpecificPostOfUser, replyData } = require('../controller/PostControllerv2');
const router = require('express').Router();

//post routes will be here

router.get('/allPosts', getAllPosts)

router.post('/makepost', makePost)

router.get('/userpost', getUserPost)

router.get('/getSpecificPost', getSpecificPostOfUser)

router.get('/deletePost', deletePost)

router.get('/countPost', countPost)

router.get('/addlike', addLike)

router.get('/unlike', deleteLike)

router.get('/countLikes', countLike)

router.get('/checkLike', checkLike)

router.post('/addComment', addComment)

router.get('/deleteComment', deleteComment)

router.get('/countComment', countComments)

router.get('/allReply',replyData)

router.post('/addReply', addReply)

router.get('/deleteReply', deleteReply)

router.get('/countReplies', countReplies)

router.get('/getAllPostData', AllPosts)

router.get('/getAllCommentData', allComments)

router.get('/getCommentsOfPost', getAllCommentsOfPost)

router.get('/getRepliesOfComment', getRepliesOfComment)

router.get('/addLikeToComment', addLikeToComment)

router.get('/deleteLikeFromComment', deleteLikeFromComment)

router.get('/countLikesOfComment', countLikeOfComment)

router.get('/checkLikeOfComment', checkLikeOfComment)

router.get('/addLikeToReply', addLikeToReply)

router.get('/deleteLikeFromReply', deleteLikeFromReply)

router.get('/countLikesOfReply', countLikeOfReply)

router.get('/checkLikeOfReply', checkLikeOfReply)

module.exports = router