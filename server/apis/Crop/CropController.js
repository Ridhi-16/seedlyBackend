const { uploadImg } = require("../../utilities/helper")
const CropModel=require("./CropModel")
add=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.cropName){
        validation+="crop name is required"
    }
     if(!formData.duration){
        validation+=" duration is required"
    }
    
     if(!formData.description){
        validation+=" description is required"
    }
    if(!formData.seasonId){
        validation+="seasonId is required"
    }
    if(!formData.farmerId){
        validation+="farmerId is required"
    }
    if(!formData.landId){
        validation+="landId is required"
    }
    // if(!req.file){
    //     validation+="profile is required"
    // }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
   else{
        //duplicacy     
        CropModel.findOne({cropName:formData.cropName,landId: formData.landId})
        .then(async (cropData)=>{
            if(!cropData){
                let cropObj= new CropModel()
                cropObj.seasonId=formData.seasonId
                cropObj.farmerId=formData.farmerId
                cropObj.landId=formData.landId

                cropObj.cropName=formData.cropName
                cropObj.duration=formData.duration
                cropObj.description=formData.description
                let url=await uploadImg(req.file.buffer)
                cropObj.image=url


               
               
                cropObj.save()
                .then((cropData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"crop Added!!",
                        data:cropData
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                        
                    })
                })
            }
            else{
                res.json({
                    status:200,
                    success:false,
                    message:"This crop already exists on this land"
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
       
    }
}


all=(req,res)=>{
    let formData=req.body
    CropModel.find(req.body)
    .populate({
        path:"seasonId",
        select:"seasonName keyword"
    })
    .populate({
        path:"farmerId",
        select:"name keyword"
    })
    .populate({
        path:"landId",
        select:"ULPIN keyword"
    })
    .then((cropData)=>{
        if(cropData.length>0){
           res.json({
                status:200,
                success:true,
                message:"crops Data is as:",
                data:cropData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"there are no crops"
            })
            
        }
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    })
}


single=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .populate({
            path:"seasonId",
            select:"seasonName keyword"
        })
        .then((cropData)=>{
            if(!cropData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no crop "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"crop Data is as",
                    data:cropData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"internal server error"
            })
        })
    }
}
update=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .then(async(cropData)=>{
            if(!cropData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                
                if(!!formData.cropName){
                   cropData.cropName=formData.cropName 
                }
                if(!!formData.description){
                    cropData.description=formData.description
                }
                if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    cropData.image = imageUrl;
                }
                cropData.save()
                .then((cropData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Crop Updated",
                        data: cropData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                       
                    })
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "internal server error"
                
            })
        })

    }
}

softDelete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .then((cropData)=>{
           if(!cropData){
            res.json({
                status:404,
                sucess:false,
                message:"there is no Crop found on this id"
            })
           }
           else{
            cropData.status=!cropData.status
            cropData.save()
            .then((cropData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Status updated",
                    data:cropData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"internal server error"
                })
            })
           }

        })
        .catch((err)=>{
            console.log(err);
            
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }

}
Delete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .then((cropData)=>{
            if(!cropData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                CropModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Crop deleted!!"
                        })
                    })
                    .catch((err) => {
                        res.json({
                            status: 500,
                            success: false,
                            message: "Internal server error"
                        })
                    })
            }

        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })    

    }


}







module.exports={add,all,single,update,softDelete,Delete}