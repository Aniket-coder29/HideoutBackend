const comments = require('../models/commentv2');
const friend = require('../models/friend');
const Post = require('../models/postv2');
const { getFriends } = require('../services/friendServices')
const { getMinDetails } = require('../services/userServices')
const replyv2 = require('../models/replyv2')

const compilePosts1 = async (ids, pageNo) => {
    console.log(ids)
    let posts = []
    try {
        // const post = await Post.find({ uid: ids }).populate({ path: 'comments' }).limit(10).skip(pageNo * 10).sort({ timestamps: 'desc' }).clone().exec();
        const post = await Post.find({ uid: ids }).populate({ path: 'comments', populate: { path: 'replies' } }).limit(10).skip(pageNo * 10).sort({ timestamps: 'desc' }).clone().exec();
        console.log("post", post)
        for (let i of post) {
            const details = await getMinDetails(i.uid)
            console.log(details)
            posts.push({ ...details.data.toJSON(), ...i.toJSON() });
        }
        console.log("posts", posts)
    } catch (error) {
        return []
    }
    finally {
        return posts
    }
}

const getAllPost = async (id, pageNo) => {
    try {
        const allfriends = await getFriends(id)
        // console.log(allfriends)
        // let posts = []
        if (allfriends.status) {
            const allIds = new Set();
            const friends = allfriends.data ? allfriends.data.friends : [];
            friends.push(id);
            console.log(friends)
            const posts = await compilePosts1(friends, pageNo)
            console.log(posts)
            return {
                status: 1,
                data: posts
            }
        }
        else {
            return {
                status: 0,
                error: allfriends.error
            }
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }

}

const delete_post = async (postid) => {
    try {
        const post = await Post.findById(postid, "comments").clone().exec()
        // console.log(comment)
        for (let i of post.comments) {
            const status = delete_comment(i)
            // if error, try once again
            if (!status.status) {
                delete_comment(i)
            }
        }
        const delPost = await Post.findByIdAndDelete(postid).clone().exec();
        console.log(delPost)
        return {
            status: 1
        }
    }
    catch (error) {
        return {
            status: 0,
            error: error
        }
    }

}

const getComments = async (postid, pageNo) => {
    try {
        const comment = await comments.find({ postid: postid }).populate('replies').limit(10).skip(pageNo * 10).sort({ timestamps: 'desc' }).clone().exec()
        // const comment = await comments.find({ postid: postid }).limit(10).skip(pageNo * 10).sort({ timestamps: 'desc' }).clone().exec()
        console.log(comment)
        if (comment) {
            return {
                status: 1,
                data: { comments: comment }
            }
        }
        else {
            return {
                status: 1,
                data: { comments: [] }
            }
        }

    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const delete_comment = async (commentid) => {
    try {
        const comment = await comments.findById(commentid).clone().exec()
        // console.log(comment)
        for (let i of comment.replies) {
            const status = delete_reply(i)
            // if error, try once again
            if (!status.status) {
                delete_reply(i)
            }
        }
        const deleteCommentIdFromPost = await Post.findByIdAndUpdate(comment.postid, { $pull: { comments: commentid } }).clone().exec()
        const delComment = await comments.findByIdAndDelete(commentid).clone().exec();
        return {
            status: 1,
        }

    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const get_replies = async (commentid, pageNo) => {
    try {
        const replies = await replyv2.find({ commentid: commentid }).limit(10).skip(pageNo * 10).sort({ timestamps: 'desc' }).clone().exec();
        if (replies) {
            return {
                status: 1,
                data: replies
            }
        }
        else {
            return {
                status: 0,
                data: []
            }
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const delete_reply = async (replyid) => {
    try {
        const reply = await replyv2.findById(replyid).clone().exec()
        // console.log(reply)
        const deleteReplyIdFromComment = await comments.findByIdAndUpdate(reply.commentid, { $pull: { replies: reply._id } }).clone().exec()
        const delReply = await reply.findByIdAndDelete(replyid).clone().exec();
        return {
            status: 1,
        }

    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

module.exports = { getAllPost, delete_post, getComments, compilePosts1, delete_reply, delete_comment, get_replies }