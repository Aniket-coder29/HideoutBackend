const Post = require('../models/post');
const Friend = require('../models/friend');

const getAllPosts = async (req, res, next) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user;
            const allfriends = await Friend.find({ userid: user.uid }, (err, docs) => {
                if (err) {
                    console.log(err)
                    res.status(500).json(err);
                }
                else {
                    res.status(200).json(docs);
                }
            });
            const allIds = [];
            const friends = allfriends.friends;
            //add all ids to array
            const posts = await Post.find({ userid: user.uid });
            res.status(200).json(posts);

        } catch (error) {
            res.status(500).json(error);
        }

    }
    else {
        //redirect to login
    }
}

const getUserPost = async (req, res, next) => {
    if (res.locals.user) {
        try {
            const uid = req.query.uid ? req.query.uid : user.uid;
            if (!uid) {
                return res.status(500).json({ "error": "no uid passed" })
            }
            const filter = { uid: uid }
            const posts = await Post.find(filter, async (err, docs) => {
                if (err) {
                    // console.log(err)
                    res.status(200).json(err)
                }
                else {
                    // console.log(docs)
                    res.status(200).json(docs)
                }
            });
            // res.status(200).json(posts);

        } catch (error) {
            res.status(500).json(error);
        }

    }
    else {
        //redirect to login
    }
}

const makePost = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user
        const filter = { uid: user.uid }
        try {
            await Post.findOne(filter, async (err, docs) => {
                if (err) {
                    // return false;
                }
                else {
                    const newPost = new Post(filter);
                    const save = newPost.save()
                    console.log(req.body)
                    Post.findOneAndUpdate(filter, { $push: {posts:req.body} }, async (err, docs) => {
                        if (err) {
                            res.status(400).json({
                                'status': 'Not able to Post! Try Again'
                            })
                        }
                        else {
                            res.status(200).json({
                                'success': "Successfully posted"
                            })
                        }
                    }).clone()
                }
            }).clone()

        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        //redirect to login
        res.status(404).json({
            "User": 'Not logged in',
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