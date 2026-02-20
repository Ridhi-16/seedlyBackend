const mongoose=require("mongoose")
const BookingSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    landId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"LandModel"},
    cropId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"CropModel"},
    seasonId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"SeasonModel"},
    price:{type:Number,default:""},
    leaseStartDate: {type: Date,required: true},
    leaseEndDate: {type: Date,required: true},
    status:{type:Boolean,default:"false"},
    transactionId:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("BookingModel",BookingSchema)

