const { getUserPost, getAllPosts, makePost, deletePost, addLike, addComment, deleteLike, deleteComment, AllPosts, addReply, allComments } = require('../controller/PostController');
const router = require('express').Router();

//post routes will be here

router.post('/makepost', makePost)

router.get('/userpost', getUserPost)

router.get('/allPosts', getAllPosts)

router.get('/deletePost', deletePost)

router.get('/addlike', addLike)

router.post('/addComment',addComment)

router.get('/unlike', deleteLike)

router.get('/deleteComment',deleteComment)

router.post('/addReply', addReply)

router.get('/getAllPostData', AllPosts)

router.get('/getAllCommentData', allComments)

module.exports = router