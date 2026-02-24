const mongoose=require("mongoose")
const ContactSchema=mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    subject:{type:String,default:""},
    message:{type:String,defult:""},
   
    status:{type:Boolean,default:"false"},
    createdAt:{type:Date,default:Date.now()}

})
module.exports=mongoose.model("ContactModel",ContactSchema)