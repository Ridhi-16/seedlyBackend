const { uploadImg } = require("../../utilities/helper")
const LandModel=require("./LandModel")


add=(req,res)=>{
    let formData=req.body
    let validation=""
    
    if(!formData.area){
        validation+="area is required"
    }
     if(!formData.price){
        validation+="price is required"
    }
     if(!formData.location){
        validation+="location is required"
    }
    
     if(!formData.landAvailability){
        validation+="Land Availability is required"
    }
     if(!formData.landName){
        validation+="Land Name is required"
    }
    // if(!req.file){
    //     validation+="profile is required"
    // }
    const ULPIN = req.body.ULPIN?.trim();

    if (!ULPIN || ULPIN.length !== 14) {
        return res.status(400).json({
            success: false,
            message: "ULPIN must be exactly 14 characters"
        });
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
   else{
        //duplicacy     
        LandModel.findOne({ULPIN:formData.ULPIN})
        .then(async (landData)=>{
            if(!landData){
                let landObj= new LandModel()
                landObj.ULPIN=formData.ULPIN
                landObj.landName=formData.landName

                landObj.farmerId=req.decoded.userId
                landObj.location=formData.location
                landObj.area=formData.area
                landObj.price=formData.price
                landObj.landAvailability=formData.landAvailability
                let imageUrls = [];

                for (let file of req.files) {
                    const url = await uploadImg(file.buffer);
                    imageUrls.push(url);
                }

                landObj.images = imageUrls;

                landObj.save()
                .then((landData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"land Added!!",
                        data:landData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Data already exist on given name"
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


all=(req,res)=>{
    let formData=req.body
    LandModel.find(req.body)
    .populate({
        path: "farmerId",
        select: "name keyword"
    })
    .then((landData)=>{
        if(landData.length>0){
           res.json({
                status:200,
                success:true,
                message:"lands Data is as:",
                data:landData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"there are no lands"
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
        LandModel.findOne({_id:req.body._id})
        .populate({
            path:"farmerId",
            select:"name keyword"
        })
        .then((landData)=>{
            if(!landData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no land "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Land Data is as",
                    data:landData
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
        LandModel.findOne({_id:req.body._id})
        .then(async(landData)=>{
            if(!landData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                if(!!formData.landName){
                   landData.landName=formData.landName 
                }
                
                if(!!formData.area){
                   landData.area=formData.area 
                }
                if(!!formData.location){
                   landData.location=formData.location 
                }
                if(!!formData.price){
                    landData.price=formData.price
                }
                if(!!formData.landAvailability){
                    landData.landAvailability=formData.landAvailability
                }

                if (req.files && req.files.length > 0) {
                    let uploadedImages = [];

                    for (let file of req.files) {
                        const url =await uploadImg(file.buffer);
                        uploadedImages.push(url);
                    }

                    landData.images = uploadedImages; // replace OR merge (your choice)
                }
                
    
                landData.save()
                .then((landData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Land Updated",
                        data: landData
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
        LandModel.findOne({_id:req.body._id})
        .then((landData)=>{
           if(!landData){
            res.json({
                status:404,
                sucess:false,
                message:"there is no land found on this id"
            })
           }
           else{
            landData.status=!landData.status
            landData.save()
            .then((landData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Status updated",
                    data:landData
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
        LandModel.findOne({_id:req.body._id})
        .then((landData)=>{
            if(!landData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                LandModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Land deleted!!"
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