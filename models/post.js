const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
    },
    posts:[
        {
            caption:{
                type: String,
            },
            images:[
                {
                    type: String,
                },
            ],
            videos:[
                {
                type: String,
                },
            ],
            likes:[
                {
                    type: String,
                }
            ],
            comments:[
                {
                    uid:{
                        type: String,
                        required: true,
                    },
                    comment:{
                        type: String,
                    },
                    replies:[
                        {
                            uid:{
                                type: String,
                                required: true,
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