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

const compilePosts2 = async(ele)=>{
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

const compilePosts1 = async(allIds)=>{
    let posts = []
    try {
        for(let i of allIds){
            // console.log(allIds[i])
            // console.log(i)
            const post = await compilePosts2(i)
            // console.log(post)
            post.forEach((pos)=>{
                posts.push(pos)
            })
        }
        // console.log("try part")
        // console.log(posts)
    } catch (error) {
        // console.log(error)
        return []
    }
    finally{
        // console.log("here")
        return posts
    }
}

const getAllPost = async(id)=>{
    try {
        const allfriends = await getFriends(id)
        // console.log(allfriends)
        // let posts = []
        if(allfriends.status){
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
                status:1,
                data:posts
            }
        }
        else{
            return {
                status:0,
                error:allfriends.error
            }
        }
    } catch (error) {
        return {
            status:0,
            error:error
        }
    }
    
}

module.exports = { getPost, getAllPost }