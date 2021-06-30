const {AuthenticationError}=require('apollo-server')
const authenticate=next=>async (parent, args, context, info)=>{

if(context.user){
    return await next(parent, args, context, info)

}
throw new AuthenticationError("not authorized")  

  

}


module.exports={authenticate}