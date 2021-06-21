const {getUserInformationById,setUserAvatar} = require('../../database/queries/UserQueries')

const getUserInformationByIdHandler=async(req,res,next)=>{
    try{
            res.status(200).json(await getUserInformationById(req.userId))

    }
    catch(e){
        next(e)
    }
}

const setUserNewAvatarHandler=async (req,res,next)=>{
    try{
            const newAvatar=req.newAvatar
            const uid=req.userId
            
             return res.json(await setUserAvatar(uid,newAvatar))
    }
    catch(e){
        next(e)
    }
}

module.exports={
    getUserInformationByIdHandler,
    setUserNewAvatarHandler
}