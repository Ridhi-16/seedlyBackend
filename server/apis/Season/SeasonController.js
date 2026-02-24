const { uploadImg } = require("../../utilities/helper")
const SeasonModel=require("./SeasonModel")

add=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.seasonName){
        validation+="Season name is required"
    }
     if(!formData.startMonth){
        validation+="Start month is required"
    }
    
     if(!formData.endMonth){
        validation+="End month is required"
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
        SeasonModel.findOne({seasonName:formData.seasonName})
        .then(async (seasonData)=>{
            if(!seasonData){
                let seasonObj= new SeasonModel()
                seasonObj.seasonName=formData.seasonName
                seasonObj.startMonth=formData.startMonth
                seasonObj.endMonth=formData.endMonth
                let url=await uploadImg(req.file.buffer)
                seasonObj.image=url

                seasonObj.save()
                .then((seasonData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Season Added!!",
                        data:seasonData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
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
    SeasonModel.find(req.body)
    // .populate({
    //     path:"seasonId",
    //     select:"seasonName keyword"
    // })
    .then((seasonData)=>{
        if(seasonData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Seasons Data is as:",
                data:seasonData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"There are no seasons"
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
        SeasonModel.findOne({_id:req.body._id})
        // .populate({
        //     path:"seasonId",
        //     select:"seasonName keyword"
        // })
        .then((seasonData)=>{
            if(!seasonData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no season "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Season Data is as",
                    data:seasonData
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
        SeasonModel.findOne({_id:req.body._id})
        .then(async(seasonData)=>{
            if(!seasonData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                 if(!!formData.seasonName){
                   seasonData.seasonName=formData.seasonName 
                }
                
                if(!!formData.startMonth){
                   seasonData.startMonth=formData.startMonth 
                }
                if(!!formData.endMonth){
                    seasonData.endMonth=formData.endMonth
                }
                if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    seasonData.image = imageUrl;
                }
                seasonData.save()
                .then((seasonData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Season Updated",
                        data: seasonData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                       
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
        validation+="_id IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        SeasonModel.findOne({_id:req.body._id})
        .then((seasonData)=>{
           if(!seasonData){
            res.json({
                status:404,
                sucess:false,
                message:"There is no season found on this id"
            })
           }
           else{
            seasonData.status=!seasonData.status
            seasonData.save()
            .then((seasonData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Status updated",
                    data:seasonData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error"
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
        SeasonModel.findOne({_id:req.body._id})
        .then((seasonData)=>{
            if(!seasonData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                SeasonModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Season deleted!!"
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