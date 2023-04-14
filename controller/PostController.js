const Post = require('../models/post');
const Friend = require('../models/friend');
const comments = require('../models/comment');
const { getFriends } = require('../services/friendServices');
const { getPost, getAllPost, compilePosts2, delete_post } = require('../services/postServices');
const { getMinDetails } = require('../services/userServices');

const AllPosts = async (req, res, next) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            const posts = await Post.find({}).clone().exec();
            res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getAllPosts = async (req, res, next) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user;
            const posts = await getAllPost(user.uid)
            // console.log("get posts in post controller",posts)
            if (posts.status) {
                res.status(200).json(posts.data);
            }
            else {
                res.status(500).json(posts.error)
            }

        } catch (error) {
            res.status(500).json(error);
        }

    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getUserPost = async (req, res, next) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user
            const uid = req.query.uid ? req.query.uid : user.uid;
            if (!uid) {
                return res.status(500).json({ "error": "no uid passed" })
            }
            // console.log(uid)
            const details = await getMinDetails(uid)
            // console.log(details)
            const post = await compilePosts2(details.data)
            // console.log(post)
            res.status(200).json(post);

        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }

    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const makePost = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const filter = { uid: user.uid }
        try {
            const PostMaker = await Post.findOne(filter).clone().exec();
            // console.log(PostMaker)
            if (!PostMaker) {
                const newPost = new Post(filter);
                const save = await newPost.save();
                // console.log(save)
            }
            const addPost = await Post.findOneAndUpdate(filter, { $push: { posts: req.body } }).clone().exec();
            // console.log(addPost)
            res.status(200).json({
                status: 1
            })
        }
        catch (error) {
            res.status(500).json({
                status: 0,
                error: error
            });
        }
    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deletePost = async (req, res) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user
            const filter = { uid: user.uid }
            const postId = req.query.postId
            console.log(user.uid, postId)
            const delPost = await delete_post(user.uid, postId)
            console.log(delPost)
            if (delPost.status) {
                res.status(200).json({ status: "Successfully deleted" })
            }
            else {
                res.status(500).json({
                    error: delPost.error
                })
            }
        } catch (error) {
            res.status(500).json(error)
        }

    }
    else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addLike = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId
        console.log(id, postid)
        try {
            const updatePost = await Post.findOneAndUpdate({ uid: id, posts: { $elemMatch: { _id: postid } } }, { $addToSet: { 'posts.$.likes': user.uid } }).clone().exec();
            // console.log(updatePost)
            res.status(200).json("Like added")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteLike = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId
        console.log(id, postid)
        try {
            const updatePost = await Post.findOneAndUpdate({ uid: id, posts: { $elemMatch: { _id: postid } } }, { $pull: { 'posts.$.likes': user.uid } }).clone().exec();
            // console.log(updatePost)
            res.status(200).json("Like removed")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const allComments = async (req, res) => {
    if (res.locals.user) {
        try {
            const comment = await comments.find({}).clone().exec()
            res.status(200).json(comment)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId
        console.log(postid)
        try {
            const findpost = await comments.findOne({postid:postid}).clone().exec()
            if(!findpost){
                const newPostComment = new comments({postid:postid});
                const save = await newPostComment.save()
                console.log(save)
            }
            const updatePost = await comments.findOneAndUpdate({ postid: postid }, { $addToSet: { comments: req.body } }).clone().exec();
            console.log(updatePost)
            res.status(200).json("Comment added")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId, commentId = req.query.commentId
        console.log(postid, commentId)
        try {
            const updatePost = await comments.findOneAndUpdate({ postid: postid }, { $pull: { comments: { _id: commentId } } }).clone().exec();
            // console.log(updatePost)
            res.status(200).json("Comment removed")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId, commentId = req.query.commentId
        console.log(id, postid, commentId)
        try {

            // const updatePost = await Post.findOneAndUpdate({ uid: id, posts: { $elemMatch: { _id: postid } }, 'posts.$.comments':{$elemMatch: { _id: commentId }} }, { $addToSet: { 'posts.$.comments': req.body } }).clone().exec();
            const findp = await Post.find({ uid: id, posts: { $elemMatch: { _id: postid } } }).clone().exec();
            console.log(findp)
            // console.log(updatePost)
            res.status(200).json(findp)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        //redirect to login
        res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

module.exports = { makePost, getUserPost, getAllPosts, deletePost, addLike, deleteLike, addComment, deleteComment, AllPosts, addReply, allComments }