const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    uid:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String
    },
    address:{
        city:{
            type:String,
        },
        state:{
            type: String,
        },
        country:{
            type: String,
        },
        pincode:{
            type:String,
        }
    },
    dob:{
        type: Date
    },
    photo:{
        type: String,
        default: ""
    },
    coverPhoto:{
        type: String,
        default: ""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    // lastActive:{
    //     type: TimeRanges
    // }
},
{timestamps:true}
);

const user = mongoose.model("User",userSchema);

module.exports=user;