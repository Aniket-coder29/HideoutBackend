const { getUserPost, getAllPosts, makePost, deletePost } = require('../controller/PostController');
const router = require('express').Router();

//post routes will be here

router.post('/post',makePost)
router.get('/mypost',getUserPost)
router.get('/post',getAllPosts)
router.post('/deletePost',deletePost)

module.exports= router