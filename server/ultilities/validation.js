var validator = require('validator');



const validUserRegister = (req, res, next) => {
  try {
    const {
      username,
      password,
      userDisplayName,
      userFullName,
      dateOfBirth,
      dateCreatedAccount,
      email,
      phone,
      gender
    } = req.body.user;
    if (
      username &&
      password &&
      userDisplayName &&
      userFullName &&
      dateOfBirth &&
      email &&
      phone &&
      dateCreatedAccount
      &&
      gender
    ) {
      req.userVerified = req.body.user;
      next();
    } else {
      throw new Error("bad request");
    }
  } catch (e) {
    next(e);
  }
};

const validUserLogin = (req, res, next) => {
  try {
    const { username, password } = req.body.user;
    if (username && password) {
      req.userVerified = req.body.user;
      next();
      return;
    } else {
      throw new Error("bad request");
    }
  } catch (e) {
    next(e);
  }
};
const validFacebookUserRegister = (req, res, next) => {
  try {
    const { username, picture, facebookid } = req.body.user;
    if (username && picture && facebookid) {
      req.userVerified = req.body.user;
      next();
      return;
    }
    next(new Error("bad request"));
  } catch (e) {
    next(e);
  }
};
const validFacebookUserLogin = (req, res, next) => {
  try {
    const {  facebookid } = req.body.user;
    if (facebookid) {
      req.userVerified = req.body.user;
      next();
      return;
    }
    next(new Error("bad request"));
  } catch (e) {
    next(e);
  }
};
const validUserEntity=(req,res,next)=>{
  
}



// post

const validNewPost=(req,res,next)=>{
  try{
    const {content,uid}=req.body

    if(validator.isNumeric(uid+'') && !validator.isEmpty(content)){
      req.postVerified=req.body
      next()
      return
      
    }
    throw new Error("bad post request!")
    

  }
  catch(e){
    next(e)
  }
}
const userCommentPostValidation=(req,res,next)=>{
    try{
          const {postid,userid,content}=req.body.comment
          if(postid && userid && content){
            req.commentVerified=req.body.comment;
            next()
            return
          }
        next(new Error("missing comment body"))          
    }catch(e){
      next(e)
    }
}
const validUpdateCommentByLastTrackedID=(req,res,next)=>{
  try{
    const {lastid,postid}=req.body.update
    if(validator.isNumeric(lastid+'') && validator.isNumeric(postid+'')){
        req.verified=req.body.update
        next()
        return
    }
    throw new Error("bad input")
  }
  catch(e){
    next(e)
  }
}
module.exports = {
  validUserRegister,
  validUserLogin,
  validFacebookUserRegister,
  validFacebookUserLogin,
  validNewPost,
  userCommentPostValidation,
  validUpdateCommentByLastTrackedID
};
