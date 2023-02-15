const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
        unique: true
    },
    posts:[
        {
            postId:{
                type: String,
                required: true,
                unique: true
            },
            creationDate:{
                type: Date,
                required: true
            },
            creationTime:{
                type: TimeRanges,
                required: true
            },
            lastEditedAt:{
                type: TimeRanges,
                required: true
            }
        },
        {timestamps:true}
    ],
    totalPosts:{
        type: Number,
        default: 0
    }
});

const post = mongoose.model("Post",postSchema);

module.exports=post;