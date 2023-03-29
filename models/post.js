const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
        unique: true
    },
    posts:[
        {
            caption:{
                type: String,
            },
            images:[
                {
                    type: String,
                    default: "null"
                },
            ],
            videos:[
                {
                type: String,
                default: "null"
                },
            ],
            likes:[
                {
                    uid:{
                        type: String,
                        required: true,
                        unique: true
                    }, 
                }
            ],
            comments:[
                {
                    uid:{
                        type: String,
                        required: true,
                        unique: true
                    },
                    comment:{
                        type: String,
                    },
                    replies:[
                        {
                            uid:{
                                type: String,
                                required: true,
                                unique: true
                            },
                            reply:{
                                type: String,
                            },
                        },
                    ]
                }
            ],
        },
        {timestamps:true}
    ],
});

const post = mongoose.model("Post",postSchema);

module.exports=post;