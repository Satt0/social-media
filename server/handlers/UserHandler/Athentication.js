const {registerUser,LoginUser,registerByFacebook}=require('../../database/queries/UserQueries')


const RegisterHandler=async(req,res,next)=>{
    
    try{
        const result=await registerUser(req.userVerified);
        req.session.user=result
        res.status(201).json({status:true,user:result})
    }
    catch(e){
        next(e)
    }
}

const LoginHandler=async (req,res,next)=>{
        try{
            const result=await LoginUser(req.userVerified)
            req.session.user=result.user
            return res.json(result)
        }
        catch(e)
        {
            next(e)
        }
}

const authFaceBookHandler=async(req,res,next)=>{
   try{
    res.json(await registerByFacebook(req.userVerified))
   }
   catch(e)
   {
       next(e)
   }
}




module.exports={
RegisterHandler,
LoginHandler,
authFaceBookHandler
}