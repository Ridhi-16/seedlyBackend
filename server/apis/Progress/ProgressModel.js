const mongoose=require("mongoose")
const ProgressSchema=mongoose.Schema({
    bookingId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"BookingModel"},
    farmerId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    progressStage:{type:String,default:""},
    description:{type:String,default:""},
    status:{type:Boolean,default:"true"},
    createdAt:{type:Date,default:Date.now()}

})
module.exports=mongoose.model("ProgressModel",ProgressSchema)