const Post = require('../models/post');
const {getFriends} = require('../services/friendServices')
const {getMinDetails} = require('../services/userServices')
const getPost = async (id) => {
    console.log("get post from post services")
    const filter = {uid:id}
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

const compilePosts = async(ele)=>{
    let posts = []
    const post = await getPost(ele.uid)
    if(post.status && post.data){
        post.data.posts.forEach((pos)=>{
            const rt = {...pos.toJSON(),...ele.toJSON()}
            posts.push(rt)
        })
    }
    return posts;
}

const getAllPost = async(id)=>{
    try {
        const allfriends = await getFriends(id)
        console.log(allfriends)
        let posts = []
        if(allfriends.status){
            const allIds = new Set();
            const friends = allfriends.data.friends;
            console.log("friends array",friends)
            friends.forEach(element => {
                allIds.add(element)
            });
            const details = await getMinDetails(id)
            allIds.add(details.data)
            allIds.forEach(async(ele)=>{
                const post = await compilePosts(ele)
                console.log("post", post)
                posts.concat(post)
                console.log(posts)
            })
            return {
                status:1,
                data:posts
            }
        }
        // return {
        //     status:1,
        //     data:posts
        // }
    } catch (error) {
        return {
            status:0,
            error:error
        }
    }
    
}

module.exports = { getPost, getAllPost }