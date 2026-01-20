const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    contact:{type:Number,defult:""},
    userType:{type:String,default:"3"},
    status:{type:Boolean,default:"true"},
    createdAt:{type:Date,default:Date.now()}

})
module.exports=mongoose.model("UserModel",UserSchema)