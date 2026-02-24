const mongoose=require("mongoose")
const LandSchema=mongoose.Schema({
    landName:{type:String,default:""},
    ULPIN: {type: String, required: true, trim: true, minlength: 14, maxlength: 14},
    farmerId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"UserModel"},
    location:{type:String,default:""},
    area:{type:Number,defult:""},
    price:{type:Number,defult:""},
    images:{type:[],default:"no pic.jpg"},
    landAvailability:{type:String,default:""},
    status:{type:Boolean,default:"false"},
    createdAt:{type:Date,default:Date.now()}

})
module.exports=mongoose.model("LandModel",LandSchema)