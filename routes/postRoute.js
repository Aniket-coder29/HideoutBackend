const { getUserPost, getAllPosts, makePost, deletePost, addLike, addComment, deleteLike, deleteComment, AllPosts, addReply } = require('../controller/PostController');
const router = require('express').Router();

//post routes will be here

router.post('/makepost', makePost)

router.get('/userpost', getUserPost)

router.get('/allPosts', getAllPosts)

router.delete('/deletePost', deletePost)

router.post('/addlike', addLike)

router.post('/addComment',addComment)

router.post('/unlike', deleteLike)

router.post('/deleteComment',deleteComment)

router.post('/addReply', addReply)

router.get('/getAllPostData', AllPosts)

module.exports = router