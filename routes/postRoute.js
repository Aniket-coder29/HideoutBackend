const { getUserPost, getAllPosts, makePost, deletePost, addLike, addComment, deleteLike, deleteComment, AllPosts, addReply, allComments, deleteReply, countReplies, countComments, countLike, countPost } = require('../controller/PostController');
const router = require('express').Router();

//post routes will be here

router.post('/makepost', makePost)

router.get('/userpost', getUserPost)

router.get('/allPosts', getAllPosts)

router.get('/deletePost', deletePost)

router.get('/countPost', countPost)

router.get('/addlike', addLike)

router.get('/unlike', deleteLike)

router.get('/countLikes', countLike)

router.post('/addComment', addComment)

router.get('/deleteComment', deleteComment)

router.get('/countComment', countComments)

router.post('/addReply', addReply)

router.get('/deleteReply', deleteReply)

router.get('/countReplies', countReplies)

router.get('/getAllPostData', AllPosts)

router.get('/getAllCommentData', allComments)

module.exports = router