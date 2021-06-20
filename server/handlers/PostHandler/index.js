const { insertPost ,getLatestPosts,getEarlierPostById} = require("../../database/queries/PostQueries");

const makePostHandler = async(req, res, next) => {
  try {
    const { content, uid } = req.postVerified;
    const post = {
      content: content,
      uid: uid,
      files: JSON.stringify(req.filesVerified),
      
      like:0,
      comment:0,
      embeded:'',
    };
    const data = await insertPost(post);
    res.status(201).json(data);
    return;
  } catch (e) {
    next(e);
  }
};
const getLatestPostsHandler=async(req,res,next)=>{
  try {
        res.json(await getLatestPosts())
        return;
  }
  catch(e){
    next(e)
  }

}
const getEarlierPostHandler=async(req,res,next)=>{
  try{
        res.json(await getEarlierPostById(req.previousId))
        return
  }catch(e){
    next(e)
  }
}
module.exports = {
  makePostHandler,
  getLatestPostsHandler,
  getEarlierPostHandler
};
