const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    dob:{
        type: Date
    },
    photo:{
        type: URL
    },
    coverPhoto:{
        type: URL
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    lastActive:{
        type: TimeRanges
    }
},
{timestamps:true}
);

const user = mongoose.model("User",userSchema);

module.exports=user;