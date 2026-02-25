const mongoose=require("mongoose")
const CropSchema=mongoose.Schema({ 
    cropName:{type:String,default:""},
    farmerId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    landId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"LandModel"},
    seasonId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"SeasonModel"},
    duration:{type:String,default:""},
    description:{type:String,default:""},
    image:{type:String,default:"no pic.jpg"},
    isBooked: {
    type: Boolean,
    default: false
  },
    status:{type:Boolean,default:"true"},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("CropModel",CropSchema)

