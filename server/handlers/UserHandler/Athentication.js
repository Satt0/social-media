const {registerUser,LoginUser,registerByFacebook}=require('../../database/queries/UserQueries')


const RegisterHandler=async(req,res,next)=>{
    
    try{
        res.status(201).json({status:true,user:await registerUser(req.userVerified)})
    }
    catch(e){
        next(e)
    }
}

const LoginHandler=async (req,res,next)=>{
        try{
            return res.json(await LoginUser(req.userVerified))
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