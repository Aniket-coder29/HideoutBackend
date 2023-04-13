const Post = require('../models/post');
const getPost = async (id) => {
    try {
        const posts = await Post.findOne(filter).clone().exec();
        console.log(posts)
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

module.exports = { getPost }