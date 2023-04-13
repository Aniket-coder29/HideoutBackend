const Post = require('../models/post');
const { getFriends } = require('../services/friendServices')
const { getMinDetails } = require('../services/userServices')

const getPost = async (id) => {
    // console.log("get post from post services")
    const filter = { uid: id }
    try {
        const posts = await Post.findOne(filter).clone().exec();
        return {
            status: 1,
            data: posts
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

const compilePosts2 = async (ele) => {
    let posts = []
    const post = await getPost(ele.uid)
    if (post.status && post.data) {
        post.data.posts.forEach((pos) => {
            const rt = { ...ele.toJSON(),...pos.toJSON() }
            posts.push(rt)
        })
    }
    return posts;
}

const compilePosts1 = async (allIds) => {
    let posts = []
    try {
        for (let i of allIds) {
            const post = await compilePosts2(i)
            post.forEach((pos) => {
                posts.push(pos)
            })
        }
    } catch (error) {
        return []
    }
    finally {
        return posts
    }
}

const getAllPost = async (id) => {
    try {
        const allfriends = await getFriends(id)
        // console.log(allfriends)
        // let posts = []
        if (allfriends.status) {
            const allIds = new Set();
            const friends = allfriends.data.friends;
            // console.log("friends array",friends)
            friends.forEach(element => {
                allIds.add(element)
            });
            const details = await getMinDetails(id)
            allIds.add(details.data)
            const posts = await compilePosts1(allIds)
            // console.log(posts)
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

const delete_post = async (id, postid) => {
    const filter = { uid: id }
    try {
        const delPost = await Post.findOneAndUpdate(filter, { $pull: { posts: { _id: postid } } }).clone().exec();
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

module.exports = { getPost, getAllPost, compilePosts2, delete_post }