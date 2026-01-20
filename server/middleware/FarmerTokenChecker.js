const jwt=require("jsonwebtoken")
const SECRET="Seedly"
module.exports=(req,res, next)=>{
    let token=req.headers.authorization 
    if(!token){
        res.json({
            status:403, 
            success:false,
            message:"No token found!"
        })
    }
    else{
        jwt.verify(token, SECRET, function(err, decoded){
            if(!!err){
                res.json({
                    status:403,
                    success:false,
                    message:"Invalid token"
                })
            }else{
                req.decoded=decoded
                if(decoded.userType==2){
                   next()
                    
                }else{
                   res.json({
                    status:403,
                    success:false,
                    message:"Unauthorized access!!"
                   })
                    
                }
            }
        })
    }
    
}