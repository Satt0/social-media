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




// post

const validNewPost=(req,res,next)=>{
  try{
    const {content,uid}=req.body

    if(uid && content){
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


module.exports = {
  validUserRegister,
  validUserLogin,
  validFacebookUserRegister,
  validFacebookUserLogin,
  validNewPost
};
