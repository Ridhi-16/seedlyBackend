const mongoose=require("mongoose")
const SeasonSchema=mongoose.Schema({
    seasonName:{type:String,default:""},
    startMonth:{type:String,default:""},
    endMonth:{type:String,default:""},
    image:{type:String,default:"no pic.jpg"},
    status:{type:Boolean,default:"true"},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("SeasonModel",SeasonSchema)

