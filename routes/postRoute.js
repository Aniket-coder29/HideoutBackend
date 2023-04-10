const { getUserPost, getAllPosts, makePost, deletePost } = require('../controller/PostController');
const router = require('express').Router();

//post routes will be here

router.post('/makepost',makePost)
router.get('/userpost',getUserPost)
router.get('/allPosts',getAllPosts)
router.delete('/deletePost',deletePost)

module.exports= router