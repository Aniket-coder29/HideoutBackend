const Post = require('../models/post');
const Friend = require('../models/friend');
const { getFriends } = require('../services/friendServices');
const { getPost, getAllPost } = require('../services/postServices');
const { getMinDetails } = require('../services/userServices');

const getAllPosts = async (req, res, next) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user;
            // const allfriends = await getFriends(user.uid)
            // console.log(allfriends)
            // let posts = []
            // if(allfriends.status){
            //     const allIds = new Set();
            //     const friends = allfriends.data.friends;
            //     console.log("friends array",friends)
            //     friends.forEach(element => {
            //         allIds.add(element)
            //     });
            //     const details = await getMinDetails(user.uid)
            //     allIds.add(details.data)
            //     // console.log("allIds",allIds)
            //     // console.log(allIds)
            //     allIds.forEach(async(ele)=>{
            //         // console.log("ele",ele)
            //         const post = await getPost(ele.uid)
            //         // console.log("post",post)
                    
                    
            //         // const details = await getMinDetails(id)
            //         if(post.status){
            //             // console.log("postdata",post.data)
            //             if(post.data){
            //                 post.data.posts.forEach((pos)=>{
            //                     // console.log("pos",pos)
            //                     const rt = {...pos.toJSON(),...ele.toJSON()}
            //                     // console.log("rt",rt)
            //                     posts.push(rt)
            //                 })
            //                 // const ret = {...post.data,...ele}
            //                 // console.log("ret",ret)
            //                 // posts.push(post.data)
            //             }
            //         }
            //     })
            //     // console.log("posts",posts)
            // }
            // console.log("posts",posts)
            // const friends = allfriends.friends;
            //add all ids to array
            // const posts = await Post.find({ userid: user.uid });
            const posts = await getAllPost(user.uid)
            console.log("get posts in post controller",posts)
            if(posts.status){
                res.status(200).json(posts.data);
            }
            else{
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
            console.log(uid)
            const filter = { uid: uid }
            const posts = await Post.findOne(filter).clone().exec();
            console.log(posts)
            // const posts = await Post.find(filter, async (err, docs) => {
            //     if (err) {
            //         // console.log(err)
            //         res.status(200).json(err)
            //     }
            //     else {
            //         // console.log(docs)
            //         res.status(200).json(docs)
            //     }
            // });
            res.status(200).json(posts);

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
            console.log(PostMaker)
            if(!PostMaker){
                const newPost = new Post(filter);
                const save = await newPost.save();
                console.log(save)
            }
            const addPost = await Post.findOneAndUpdate(filter,{ $push: {posts:req.body} }).clone().exec();
            console.log(addPost)
            res.status(200).json({
                status:1
            })
            // await Post.findOne(filter, async (err, docs) => {
            //     if (err) {
            //         // return false;
            //     }
            //     else {
            //         const newPost = new Post(filter);
            //         const save = newPost.save()
            //         console.log(req.body)
            //         Post.findOneAndUpdate(filter, { $push: {posts:req.body} }, async (err, docs) => {
            //             if (err) {
            //                 res.status(400).json({
            //                     'status': 'Not able to Post! Try Again'
            //                 })
            //             }
            //             else {
            //                 res.status(200).json({
            //                     'success': "Successfully posted"
            //                 })
            //             }
            //         }).clone()
            //     }
            // }).clone()

        }
        catch (error) {
            res.status(500).json({
                status:0,
                error:error
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
            const delPost = Post.findOneAndUpdate(filter, { $pullAll: { posts: postId } }, async (err, docs) => {
                if (err) {
                    console.log(err)
                    res.status(200).json(err)
                }
                else {
                    // console.log(docs)
                    res.status(200).json(docs)
                }
            })
        } catch (error) {
            res.status(500).json(error)
        }

    }
}

module.exports = { makePost, getUserPost, getAllPosts, deletePost }