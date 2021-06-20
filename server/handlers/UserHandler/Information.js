const {getUserInformationById} = require('../../database/queries/UserQueries')

const getUserInformationByIdHandler=async(req,res,next)=>{
    try{
            res.status(200).json(await getUserInformationById(req.userId))

    }
    catch(e){
        next(e)
    }
}



module.exports={
    getUserInformationByIdHandler
}