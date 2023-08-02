import mongoose from "mongoose";

// defining schema 
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

// a collection named users will be created 
const User=mongoose.model("user",userSchema);

export default User;
