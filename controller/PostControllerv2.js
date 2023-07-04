const Post = require('../models/postv2');
const Friend = require('../models/friend');
const comments = require('../models/commentv2');
const { getFriends } = require('../services/friendServices');
const { getAllPost, compilePosts1, delete_post, getComments, delete_comment, delete_reply } = require('../services/postServicesv2');
const { getMinDetails } = require('../services/userServices');
const { friendPosted, postLiked, postCommented, replyOnCommentInPost } = require('../services/notificationServices');
const replyv2 = require('../models/replyv2');

const AllPosts = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            // const posts = await Post.find({}).populate({ path: 'comments' }).clone().exec();
            const posts = await Post.find({}).populate({ path: 'comments', populate: { path: 'replies' } }).clone().exec();
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getAllPosts = async (req, res) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user;
            const posts = await getAllPost(user.uid, req.query.pageNo)
            if (posts.status) {
                return res.status(200).json(posts.data);
            }
            else {
                return res.status(500).json(posts.error)
            }

        } catch (error) {
            return res.status(500).json(error);
        }

    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getUserPost = async (req, res) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user
            const uid = req.query.uid ? req.query.uid : user.uid;
            if (!uid) {
                return res.status(500).json({ "error": "no uid passed" })
            }
            let id = [uid]
            const getPost = await compilePosts1(id, req.query.pageNo)
            return res.status(200).json(getPost)

        } catch (error) {
            // console.log(error)
            return res.status(500).json(error);
        }

    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const makePost = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const filter = { uid: user.uid }
        const data = { ...filter, ...req.body }
        try {
            const addPost = new Post(data);
            const save = await addPost.save()

            const posts1 = await Post.find(filter).populate({ path: 'comments', populate: { path: 'replies' } }).limit(1).sort({ timestamps: 'desc' }).clone().exec()

            // const sendNotif = await friendPosted(user.uid, posts1._id)

            return res.status(200).json({
                status: 1,
                data: posts1
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 0,
                error: error
            });
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deletePost = async (req, res) => {
    if (res.locals.user) {
        try {
            const postId = req.query.postId
            const delPost = await delete_post(postId)
            if (delPost.status) {
                return res.status(200).json({ status: "Successfully deleted" })
            }
            else {
                return res.status(500).json({
                    error: delPost.error
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }

    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getSpecificPostOfUser = async (req, res) => {
    if (res.locals.user) {
        try {
            const postid = req.query.postId
            let post = await Post.findById(postid).populate({ path: 'comments', populate: { path: 'replies' } }).clone().exec()
            console.log(post)
            const details = await getMinDetails(post.uid)
            return res.status(200).json({ ...details.data.toJSON(), ...post.toJSON() });

        } catch (error) {
            // console.log(error)
            return res.status(500).json(error);
        }

    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const countPost = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const uid = req.query.uid ? req.query.uid : user.uid;
        const filter = { uid: uid }
        try {
            const cnt = await Post.find(filter).count().clone().exec();
            return res.status(200).json(cnt);
        }
        catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addLike = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId
        // console.log(id, postid)
        try {
            const updatePost = await Post.findByIdAndUpdate(postid, { $addToSet: { likes: user.uid } }).clone().exec();
            // const sendNotif = await postLiked(id, postid, user.uid)
            return res.status(200).json("Like added")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const checkLike = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId
        try {
            const findPost = await Post.find({ _id: postid, likes: { $in: user.uid } }).clone().exec();
            // console.log(findPost)
            return res.status(200).json(findPost.length)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteLike = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId
        // console.log(id, postid)
        try {
            const updatePost = await Post.findByIdAndUpdate(postid, { $pull: { likes: user.uid } }).clone().exec();
            // console.log(updatePost)
            return res.status(200).json("Like removed")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const countLike = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId
        // console.log(id, postid)
        try {
            const likesArray = await Post.findById(postid, 'likes').clone().exec();
            // console.log(likesArray.likes)
            return res.status(200).json(likesArray.likes.length)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const allComments = async (req, res) => {
    if (res.locals.user) {
        try {
            // const comment = await comments.find({}).clone().exec()
            const comment = await comments.find({}).populate({ path: 'replies' }).clone().exec();
            return res.status(200).json(comment)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getAllCommentsOfPost = async (req, res) => {
    if (res.locals.user) {
        const postid = req.query.postId
        try {
            const findPost = await getComments(postid)
            // console.log(findPost)
            if (findPost.status) {
                res.status(200).json(findPost.data)
            }
            else {
                // console.log("no comment ever")
                res.status(200).json({ comments: [] })
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

const addComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId
        const data = req.body
        try {
            const addcommentToPost = new comments({ postid: postid, ...data })
            const save = await addcommentToPost.save();
            // console.log(save)
            const addCommentIdToPost = await Post.findByIdAndUpdate(postid, { $addToSet: { comments: save._id } }).clone().exec()
            // const sendNotif = await postCommented(id, postid, user.uid)
            return res.status(200).json("Comment added")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId, commentId = req.query.commentId
        // console.log(postid, commentId)
        try {

            const delComment = await delete_comment(commentId)
            // console.log(delComment)
            if (delComment.status)
                return res.status(200).json("Comment removed")
            else
                return res.status(500).json(delComment.error)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const countComments = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId
        // console.log(postid)
        try {
            const findpost = await comments.find({ postid: postid }).count().clone().exec()
            // console.log(findpost)
            if (!findpost) {
                return res.status(200).json(0);
            }
            else {
                return res.status(200).json(findpost)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const replyData = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        try {
            const replys = await replyv2.find({}).clone().exec()
            return res.status(200).json(replys)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const id = req.query.id, postid = req.query.postId, commentId = req.query.commentId, commenterId = req.query.commenterId
        // console.log(postid, commentId)
        try {
            // const updateReply = await comments.findOneAndUpdate({ postid: postid, comments: { $elemMatch: { _id: commentId } } }, { $push: { 'comments.$.replies': req.body } }).clone().exec()
            // // console.log(updateReply)
            const updateReply = new replyv2({ commentid: commentId, ...req.body });
            const save = await updateReply.save();
            const addReplyToComment = await comments.findByIdAndUpdate(commentId, { $addToSet: { replies: save._id } }).clone().exec()
            // const sendNotif = await replyOnCommentInPost(id, postid, commenterId, user.uid)
            return res.status(200).json("Successfully added")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId, commentId = req.query.commentId, replyid = req.query.replyId
        // console.log(postid, commentId, replyid)
        try {
            // const updateReply = await comments.findOneAndUpdate({ postid: postid, comments: { $elemMatch: { _id: commentId } } }, { $pull: { 'comments.$.replies': { _id: replyid } } }).clone().exec()
            // console.log(updateReply)

            const delReply = await delete_reply(replyid)
            return res.status(200).json("Successfully deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const countReplies = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId, commentId = req.query.commentId
        // console.log(postid, commentId)
        try {
            const no_of_replies = await replyv2.find({ commentid: commentId }).count().clone().exec();
            return res.status(200).json(no_of_replies)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getRepliesOfComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const postid = req.query.postId, commentId = req.query.commentId
        // console.log(postid, commentId)
        try {
            const replies = await replyv2.find({ commentid: commentId }).clone().exec();
            return res.status(200).json(replies)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addLikeToComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId
        // console.log(commentid, postid)
        try {
            const addLike = await comments.findByIdAndUpdate(commentid, { $addToSet: { likes: user.uid } }).clone().exec();

            // const sendNotif = await postLiked(id, postid, user.uid)

            // console.log(updatePost)
            return res.status(200).json("Like added to comment")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteLikeFromComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId
        // console.log(commentid, postid)
        try {
            const delLike = await comments.findByIdAndUpdate(commentid, { $pull: { likes: user.uid } }).clone().exec();
            return res.status(200).json("Like removed from comment")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const countLikeOfComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId
        // console.log(commentid, postid)
        try {
            const likes = await comments.findById(commentid, likes).clone.exec();
            if (likes)
                return res.status(200).json(likes.likes.length)
            else
                return res.status(200).json(0)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const checkLikeOfComment = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId
        // console.log(commentid, postid)
        try {
            const likes = await comments.find({ _id: commentid, likes: { $in: user.uid } }).clone.exec();
            return res.status(200).json(likes.length)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const addLikeToReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId, replyid = req.query.replyId
        // console.log(commentid, postid, replyid)
        try {
            const addLike = await replyv2.findByIdAndUpdate(replyid, { $addToSet: { likes: user.uid } }).clone().exec();
            // const sendNotif = await postLiked(id, postid, user.uid)
            return res.status(200).json("Like added to Reply")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const deleteLikeFromReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId, replyid = req.query.replyId
        // console.log(commentid, postid, replyid)
        try {
            const addLike = await replyv2.findByIdAndUpdate(replyid, { $pull: { likes: user.uid } }).clone().exec();

            return res.status(200).json("Like removed from reply")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const countLikeOfReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId, replyid = req.query.replyId
        // console.log(commentid, postid, replyid)
        try {
            const likes = await replyv2.findById(replyid, likes).clone.exec();
            return res.status(200).json(likes.likes.length)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const checkLikeOfReply = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const commentid = req.query.commentId, postid = req.query.postId, replyid = req.query.replyId
        // console.log(commentid, postid, replyid)
        try {
            const likes = await replyv2.find({ _id: replyid, likes: { $in: user.uid } }).clone.exec();
            return res.status(200).json(likes.length)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

module.exports = { makePost, getUserPost, getAllPosts, deletePost, countPost, addLike, deleteLike, countLike, checkLike, addComment, deleteComment, countComments, AllPosts, addReply, deleteReply, countReplies, getRepliesOfComment, allComments, getAllCommentsOfPost, addLikeToComment, deleteLikeFromComment, countLikeOfComment, checkLikeOfComment, addLikeToReply, deleteLikeFromReply, countLikeOfReply, checkLikeOfReply, getSpecificPostOfUser, replyData }