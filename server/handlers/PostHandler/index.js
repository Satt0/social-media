const {
  insertPost,
  getLatestPosts,
  getEarlierPostById,
  getUserPostById,
  getUserEARLIERPostById,
  userCommentPost,
  getPostLatestCommentByIdLimit10
} = require("../../database/queries/PostQueries");

const makePostHandler = async (req, res, next) => {
  try {
    const { content, uid } = req.postVerified;
    const post = {
      content: content,
      uid: uid,
      files: JSON.stringify(req.filesVerified),

      like: 0,
      comment: 0,
      embeded: "",
    };
    const data = await insertPost(post);
    res.status(201).json(data);
    return;
  } catch (e) {
    next(e);
  }
};
const getLatestPostsHandler = async (req, res, next) => {
  try {
    res.json(await getLatestPosts());
    return;
  } catch (e) {
    next(e);
  }
};
const getEarlierPostHandler = async (req, res, next) => {
  try {
    res.json(await getEarlierPostById(req.previousId));
    return;
  } catch (e) {
    next(e);
  }
};
const getUserPostByIdHandler = async (req, res, next) => {
  try {
    res.json(await getUserPostById(req.userId));
  } catch (e) {
    next(e);
  }
};
const getUserEarlierPostByIdHandler = async (req, res, next) => {
  try {
    res.json(await getUserEARLIERPostById(req.previousId, req.userId));
  } catch (e) {
    next(e);
  }
};

const postUserCommentToPostHanlder = async (req, res, next) => {
  try {
    return res.status(201).json(await userCommentPost(req.commentVerified));
  } catch (e) {
    next(e);
  }
};
const getPostLatestCommentHandler=async(req,res,next)=>{
    try{
            return res.status(200).json(await getPostLatestCommentByIdLimit10(req.postid))
    }
    catch(e){
      next(e)
    }
  }
module.exports = {
  makePostHandler,
  getLatestPostsHandler,
  getEarlierPostHandler,
  getUserPostByIdHandler,
  getUserEarlierPostByIdHandler,
  postUserCommentToPostHanlder,
  getPostLatestCommentHandler
};
