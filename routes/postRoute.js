const { getUserPost, getAllPosts, makePost, deletePost, addLike } = require('../controller/PostController');
const router = require('express').Router();

//post routes will be here

router.post('/makepost', makePost)

router.get('/userpost', getUserPost)

router.get('/allPosts', getAllPosts)

router.delete('/deletePost', deletePost)

router.post('/addlike', addLike)

module.exports = router